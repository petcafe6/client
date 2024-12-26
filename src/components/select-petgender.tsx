import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props {
  onChange?: (e: string) => void
  defaultValue?: string
}
export function SelectPetGender({ defaultValue, onChange }: Props) {
  return (<Select
    value={defaultValue}
    onValueChange={onChange}
  >
    <SelectTrigger className="w-full">
      <SelectValue placeholder="-" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="female">Female</SelectItem>
        <SelectItem value="male">Male</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>)
}