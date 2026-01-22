import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { SignIn, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import IconButton from "@/components/icon-button";
import { ShieldUserIcon } from "@hugeicons/core-free-icons";

export default function UnauthenticatedView() {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="w-full max-w-lg">
        <Item variant="outline" className="bg-muted">
          <ItemMedia variant="icon">
            <IconButton icon={ShieldUserIcon} size={"lg"} />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Unauthorized Access</ItemTitle>
            <ItemDescription>
              You are not authorized to access this resource.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <SignInButton>
              <Button variant="outline" size="sm">
                Sign in
              </Button>
            </SignInButton>
          </ItemActions>
        </Item>

        <SignIn />
      </div>
    </div>
  );
}
