import { Copy } from 'lucide-react-native';
import { Platform, Pressable, View } from 'react-native';
import { Text, toast } from '@/components/ui';
import { formatNaira } from '@/lib/format';
import { palette } from '@/theme';
import type { PaymentInstruction } from '@/types/domain';

const copy = async (value: string) => {
  if (Platform.OS === 'web' && typeof navigator !== 'undefined') await navigator.clipboard?.writeText(value);
  toast.show({ title: 'Copied', message: value });
};

/** Bank details shown after a transfer order, so the customer can pay. */
export function PaymentInstructions({ instruction }: { instruction: PaymentInstruction }) {
  if (instruction.type !== 'bank_transfer') return null;
  const rows = [
    ['Bank', instruction.bankName],
    ['Account name', instruction.accountName],
    ['Account number', instruction.accountNumber],
    ['Reference', instruction.reference],
  ] as const;

  return (
    <View className="rounded-3xl border border-dashed border-rose-300 bg-blush-100 p-4">
      <Text variant="overline">Complete your transfer</Text>
      <Text className="mt-1 text-muted">
        Send exactly <Text className="font-body-semibold text-ink">{formatNaira(instruction.amount)}</Text> to the account below and
        put the reference in the narration. Your order is confirmed once the money arrives.
      </Text>
      <View className="mt-3 gap-2">
        {rows.map(([label, value]) => (
          <View key={label} className="flex-row items-center justify-between">
            <Text variant="caption">{label}</Text>
            <Pressable onPress={() => copy(value)} className="flex-row items-center gap-1.5">
              <Text className="font-body-semibold text-[13px]">{value}</Text>
              {label !== 'Bank' && <Copy size={13} color={palette.rose[500]} />}
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}
