import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const NavbarSkeleton = () => (
  <>
    <header className="fixed top-0 left-0 w-full z-50 transition-colors duration-200 bg-background">
      <div className="container mx-auto px-4 md:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-7 w-auto" />
          <Skeleton className="text-xl font-bold w-24 h-6" />
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-24 h-6" />
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-pink-200 transition-colors duration-200"
        >
          <Skeleton className="h-6 w-6" />
        </Button>
      </div>
    </header>
    <div className="fixed top-0 left-0 w-full h-full md:hidden bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <div className="w-full h-full flex flex-col bg-gray-200">
        <div className="px-6 py-4 flex items-center justify-between border-b">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-7 w-auto" />
            <Skeleton className="text-xl font-bold w-24 h-6" />
          </div>
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
        <nav className="flex-1 px-12 py-12 space-y-4 flex flex-col">
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
        </nav>
        <div className="px-6 py-4 border-t flex items-center space-x-4">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>
    </div>
  </>
);

export default NavbarSkeleton;
