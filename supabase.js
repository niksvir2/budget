import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://ijksnxqnabykqjvqeoud.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlqa3NueHFuYWJ5a3FqdnFlb3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNDI0MzMsImV4cCI6MjA2NDYxODQzM30.TXQO0z4iEP95eVVwirdEwww0BWJyPmKKg_DSC4SSr9Q'
const supabase = createClient(supabaseUrl, supabaseKey)

// Проверка активной сессии
async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  return { data, error }
}

// Функция входа
async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.error('Ошибка входа:', error.message)
      return { error }
    }

    return { data }
  } catch (error) {
    console.error('Ошибка:', error)
    return { error: { message: 'Произошла ошибка при входе' } }
  }
}

// Функция регистрации
async function register(email, password, phone, organization) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          phone,
          organization
        }
      }
    })

    if (error) throw error

    return { data }
  } catch (error) {
    console.error('Ошибка регистрации:', error)
    return { error: { message: error.message || 'Ошибка регистрации' } }
  }
}

// Выход из системы
async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) console.error('Ошибка выхода:', error)
  return !error
}

export { supabase, getSession, login, register, logout }