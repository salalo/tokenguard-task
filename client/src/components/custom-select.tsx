import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type Props = {
  onChange: (value: string) => void,
  value: string,
  options: Array<string>,
  label?: string
}

export const CustomSelect = ({ onChange, value, options, label }: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      <Label>{label}</Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-[180px] capitalize">
          <SelectValue placeholder="Select a chain" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => <SelectItem className='capitalize' value={option} key={option}>{option}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  )
}
