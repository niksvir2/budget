import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://ijksnxqnabykqjvqeoud.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlqa3NueHFuYWJ5a3FqdnFlb3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNDI0MzMsImV4cCI6MjA2NDYxODQzM30.TXQO0z4iEP95eVVwirdEwww0BWJyPmKKg_DSC4SSr9Q'

const supabase = createClient(supabaseUrl, supabaseKey)

// Проверка и восстановление сессии
async function getSession() {
    try {
        // Сначала проверяем локальное хранилище
        const storedSession = JSON.parse(localStorage.getItem('auth')) || 
                            JSON.parse(sessionStorage.getItem('auth'))
        
        if (storedSession) {
            // Проверяем валидность сессии на сервере
            const { data: { user }, error } = await supabase.auth.getUser(storedSession.access_token)
            
            if (!error && user) {
                return { session: storedSession, user }
            }
            
            // Если сессия невалидна, очищаем хранилище
            localStorage.removeItem('auth')
            sessionStorage.removeItem('auth')
        }
        
        // Если нет сохраненной сессии, проверяем текущую
        const { data, error } = await supabase.auth.getSession()
        
        if (error) throw error
        return data
    } catch (error) {
        console.error('Ошибка получения сессии:', error)
        throw error
    }
}

// Остальные функции остаются без изменений
async function login(email, password) { ... }
async function register(email, password, phone, organization) { ... }
async function logout() { ... }

export { supabase, getSession, login, register, logout }