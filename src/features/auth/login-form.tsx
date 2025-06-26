import {  useForm } from "react-hook-form"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/shared/ui/kit/form.tsx"
import { Button } from "@/shared/ui/kit/button"
import { Input } from "@/shared/ui/kit/input"
import { z } from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

const loginSchema = z.object({
  email: z.string({required_error: 'Email обязательное поле'}).email('Неверный формат email'),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
})

export function LoginForm() {

  const form = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = form.handleSubmit((data) => {
    console.log(data)
  })
  
  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <FormField
        control={form.control}
        name="email"
        render={({field}) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="admin@gmail.com" {...field} />
            </FormControl>            
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({field}) => (
          <FormItem>
            <FormLabel>Пароль</FormLabel>
            <FormControl>
              <Input placeholder="********" {...field} type="password" />
            </FormControl>            
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Войти</Button>
      </form>      
    </Form>
  )
}
