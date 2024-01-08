import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { filterMessages } from "../helpers/filterMessages";
import { messageType } from "../types/types";

const Filter = ({
  messages,
  setCategory,
}: {
  messages: messageType[] | undefined;
  setCategory: any;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="bg-primary">
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Date</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={()  => setCategory("all")}>All</DropdownMenuItem>
          <DropdownMenuItem onClick={() =>setCategory("today")}>
            Today
          </DropdownMenuItem>
          <DropdownMenuItem>Yesterday</DropdownMenuItem>
          <DropdownMenuItem>Older</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Filter;
