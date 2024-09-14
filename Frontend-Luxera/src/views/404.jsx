import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { HomeIcon, ArrowLeftIcon } from 'lucide-react'
import Title from "@/title"

export default function NotFoundPage() {
  return (
    <>
    <Title title="404" />
    <div className="flex flex-col py-12 md:py-24 bg-background">
      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-4 md:space-y-6">
          <div className="space-y-2 md:space-y-4">
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter">404</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-[600px] mx-auto">
              Oops! It seems like you've ventured into uncharted territory. The page you're looking for doesn't exist or may have been moved.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button asChild variant="outline" className="w-full">
                <Link to="/">
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
              <Button asChild className="w-full">
                <Link onClick={() => window.history.back()}>
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Go Back
                </Link>
              </Button>
            </div>
          </div>
          <div className="w-full max-w-md">
            <p className="text-sm text-muted-foreground">
              If you believe this is a mistake, please contact our{" "}
              <Link href="/support" className="underline underline-offset-2 hover:text-primary">
                support team
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}