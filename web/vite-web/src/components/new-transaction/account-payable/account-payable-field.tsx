import { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

export function AccountPayableFiled() {
  const [isSwitchOn, setIsSwitchOn] = useState(false)

  function handleSwitchChange() {
    setIsSwitchOn(!isSwitchOn)
  }

  return (
    <div className="mx-auto grid max-w-screen-md grid-cols-1 gap-2 bg-background md:grid-cols-2">
      <span className="flex min-h-10 items-center rounded-md border bg-background">
        <Switch
          className="ml-3 mr-3"
          checked={isSwitchOn}
          onCheckedChange={handleSwitchChange}
        />
        <p className="text-sm">Gasto Recorrente</p>
      </span>
      <Select
        // onValueChange={onChange}
        disabled={isSwitchOn}
      >
        <SelectTrigger>
          <SelectValue placeholder="Quantidade de Parcelas" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Array.from({ length: 12 }, (_, index) => index + 1).map(
              (value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value}
                </SelectItem>
              ),
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
