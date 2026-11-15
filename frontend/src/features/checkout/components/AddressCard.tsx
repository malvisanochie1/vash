import { MapPin, Phone, User } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import { Button, Input, Text } from '@/components/ui';
import { palette, shadow } from '@/theme';
import type { Address } from '@/types/domain';

export interface DeliveryDetails {
  recipient: string;
  address: Address;
}

interface Props {
  value: DeliveryDetails;
  onChange: (value: DeliveryDetails) => void;
  startEditing?: boolean;
}

export const isAddressComplete = ({ recipient, address }: DeliveryDetails) =>
  recipient.trim().length > 1 && address.line1.trim().length > 3 && address.city.trim().length > 1 && address.phone.trim().length > 6;

/** Delivery address that expands into an inline form. */
export function AddressCard({ value, onChange, startEditing }: Props) {
  const [editing, setEditing] = useState(Boolean(startEditing));
  const [draft, setDraft] = useState(value);
  const setAddress = (patch: Partial<Address>) => setDraft((d) => ({ ...d, address: { ...d.address, ...patch } }));

  return (
    <Animated.View layout={LinearTransition.springify()} className="rounded-3xl bg-white p-4" style={shadow.card}>
      {editing ? (
        <Animated.View key="edit" entering={FadeIn} exiting={FadeOut} className="gap-3">
          <Input icon={User} placeholder="Recipient name" value={draft.recipient} onChangeText={(recipient) => setDraft((d) => ({ ...d, recipient }))} />
          <Input icon={MapPin} placeholder="Street address" value={draft.address.line1} onChangeText={(line1) => setAddress({ line1 })} />
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Input placeholder="City" value={draft.address.city} onChangeText={(city) => setAddress({ city })} />
            </View>
            <View className="flex-1">
              <Input placeholder="State" value={draft.address.state} onChangeText={(state) => setAddress({ state })} />
            </View>
          </View>
          <Input icon={Phone} placeholder="Phone number" keyboardType="phone-pad" value={draft.address.phone} onChangeText={(phone) => setAddress({ phone })} />
          <Button
            title="Save address"
            variant="dark"
            size="md"
            disabled={!isAddressComplete(draft)}
            onPress={() => {
              onChange(draft);
              setEditing(false);
            }}
          />
        </Animated.View>
      ) : (
        <Animated.View key="view" entering={FadeIn} className="flex-row items-start gap-3">
          <View className="h-11 w-11 items-center justify-center rounded-2xl bg-blush-200">
            <MapPin size={20} color={palette.rose[600]} />
          </View>
          <View className="flex-1">
            <Text className="font-body-semibold">{value.recipient}</Text>
            <Text variant="caption">
              {value.address.line1}, {value.address.city}
            </Text>
            <Text variant="caption">{value.address.phone}</Text>
          </View>
          <Pressable onPress={() => setEditing(true)} hitSlop={10}>
            <Text className="font-body-semibold text-xs text-rose-600">Change</Text>
          </Pressable>
        </Animated.View>
      )}
    </Animated.View>
  );
}
