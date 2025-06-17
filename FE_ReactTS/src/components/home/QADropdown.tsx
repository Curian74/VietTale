import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function QADropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-[#f8b560] text-black hover:bg-[#d0a670] w-30 text-md cursor-pointer">
          Q&A
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
            className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-100">
        <DropdownMenuGroup className="font-medium">
          <DropdownMenuItem className="cursor-pointer">
            Lịch sử 12
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Lịch sử 11
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Lịch sử 10
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Lịch sử 9
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Lịch sử 8
          </DropdownMenuItem>

        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
