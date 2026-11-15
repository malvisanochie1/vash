import * as Clipboard from 'expo-clipboard';
import { Check, Copy } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import { palette } from '@/theme';

interface Props {
  label: string;
  value: string;
  large?: boolean;
  copyable?: boolean;
}

/** A labelled value with a one-tap copy button that confirms itself. */
export function CopyRow({ label, value, large, copyable = true }: Props) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await Clipboard.setStringAsync(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <View className="flex-row items-center justify-between py-2.5">
      <View className="flex-1 pr-3">
        <Text variant="caption">{label}</Text>
        <Text className={cn('font-body-semibold text-ink', large ? 'text-[22px] tracking-[1px]' : 'text-[15px]')}>{value}</Text>
      </View>
      {copyable && (
        <Pressable
          onPress={copy}
          hitSlop={8}
          accessibilityLabel={`Copy ${label}`}
          className={cn('flex-row items-center gap-1.5 rounded-full px-3 py-2', copied ? 'bg-success/15' : 'bg-blush-100')}
        >
          {copied ? <Check size={14} color={palette.success} /> : <Copy size={14} color={palette.rose[600]} />}
          <Text className={cn('font-body-semibold text-xs', copied ? 'text-success' : 'text-rose-600')}>{copied ? 'Copied' : 'Copy'}</Text>
        </Pressable>
      )}
    </View>
  );
}
