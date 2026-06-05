import { Button } from './ui/button'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from './ui/drawer'

interface IDrawerFormProps {
  title: string
  isOpen: boolean | undefined
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export function DrawerForm({
  title,
  isOpen,
  onOpenChange,
  children,
}: IDrawerFormProps) {
  return (
    <div className="flex justify-end pb-3">
      <Drawer onOpenChange={onOpenChange} open={isOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-48 min-w-48 rounded-sm bg-green-500 text-slate-100 hover:bg-green-700 hover:text-slate-100 max-md:w-full"
          >
            {title}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mt-3 p-4">
            <DrawerTitle>{title}</DrawerTitle>
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
