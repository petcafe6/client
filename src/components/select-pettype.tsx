import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props {
  onChange?: (e: string) => void
  defaultValue?: string
}
export function SelectPetType({ defaultValue, onChange }: Props) {
  return (<Select
    value={defaultValue}
    onValueChange={onChange}
  >
    <SelectTrigger className="w-full">
      <SelectValue placeholder="-" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="dog">Dog</SelectItem>
        <SelectItem value="cat">Cat</SelectItem>
        <SelectItem value="bird">Bird</SelectItem>
        <SelectItem value="reptile">Reptile</SelectItem>
        <SelectItem value="fish">Fish</SelectItem>
        <SelectItem value="goat">Goat</SelectItem>
        <SelectItem value="sheep">Sheep</SelectItem>
        <SelectItem value="cow">Cow</SelectItem>
        <SelectItem value="turtle">Turtle</SelectItem>
        <SelectItem value="rabbit">Rabbit</SelectItem>
        <SelectItem value="hamster">Hamster</SelectItem>
        <SelectItem value="snake">Snake</SelectItem>
        <SelectItem value="horse">Horse</SelectItem>
        <SelectItem value="iguana">Iguana</SelectItem>
        <SelectItem value="monkey">Monkey</SelectItem>
        <SelectItem value="rooster">Rooster</SelectItem>
        <SelectItem value="other">Other</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>)
}