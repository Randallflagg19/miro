import { AuthLayout } from "@/features/auth/ui/auth-layout"
import { ROUTES } from "@/shared/model/routes.ts"
import { Link } from "react-router-dom"
import { RegisterForm } from "./ui/register-form"

function RegisterPage() {
  return (
    <AuthLayout
      title="Регистрация"
      description="Введите ваш email и пароль для регистрации"
      form={<RegisterForm />}
      footerText={
        <>
          Уже есть аккаунт? <Link to={ROUTES.LOGIN}>Войти</Link>
        </>
      }
    />
  )
}

export const Component = RegisterPage
