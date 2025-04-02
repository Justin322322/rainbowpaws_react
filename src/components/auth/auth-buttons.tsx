"use client"

import { LoginDialog } from './login-dialog'
import { SignupDialog } from './signup-dialog'

export function AuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <LoginDialog />
      <SignupDialog />
    </div>
  )
}