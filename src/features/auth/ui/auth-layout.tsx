import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card.tsx"

export function AuthLayout({
  form,
  title,
  description,
  footerText,
}: {
  form: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  footerText: React.ReactNode
}) {
  return (
    <main className="grow flex flex-col pt-50 items-center">
      <Card className="w-full max-w-100">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{form}</CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground [&_a]:underline [&_a]:text-primary ">
            {footerText}
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}
