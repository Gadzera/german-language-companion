-- Удаляем ВСЕ старые небезопасные политики для quiz_questions
DROP POLICY IF EXISTS "Anyone can read quiz questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Authenticated users can delete questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Authenticated users can insert questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Authenticated users can update questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Anyone can view quiz questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Only service role can modify quiz questions" ON public.quiz_questions;

-- Создаём ТОЛЬКО политику на чтение - запись полностью запрещена для пользователей
-- Это безопасно, т.к. контент загружается из локальных файлов
CREATE POLICY "Public read access to quiz questions" 
ON public.quiz_questions 
FOR SELECT 
USING (true);