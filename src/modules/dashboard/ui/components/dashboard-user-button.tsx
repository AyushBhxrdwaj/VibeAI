import { GeneratedAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { DropdownMenuContent, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import React from "react";

const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();
  if (isPending || !data?.user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex  items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
        {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : <GeneratedAvatar seed={data.user.name} variant="initials" className="size-9 mr-3"/>}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="w-full text-sm truncate">
                {data.user.name}
            </p>
            <p className="w-full text-xs truncate">
                {data.user.email}
            </p>
        </div>
        <ChevronDown className="size-4 shrink-0"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
            <div className="flex flex-col gap-1">
                <span className="font-medium truncate">{data.user.name}</span>
                <span className="text-sm text-muted-foreground truncate">{data.user.email}</span>
            </div>
        </DropdownMenuLabel>

      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardUserButton;
