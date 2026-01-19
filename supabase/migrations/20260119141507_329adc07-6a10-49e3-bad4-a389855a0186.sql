-- Удаляем небезопасные политики для quiz_questions
DROP POLICY IF EXISTS "Anyone can view quiz questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Authenticated users can insert quiz questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Authenticated users can update quiz questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Authenticated users can delete quiz questions" ON public.quiz_questions;

-- Создаём безопасные политики: только чтение для всех, запись только для админов
CREATE POLICY "Anyone can view quiz questions" 
ON public.quiz_questions 
FOR SELECT 
USING (true);

-- Для записи/обновления/удаления - только сервисный ключ (через edge functions)
-- Обычные пользователи не могут изменять контент
CREATE POLICY "Only service role can modify quiz questions" 
ON public.quiz_questions 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');