---
name: humanizer
description: Удаление AI-паттернов из текста и придание контенту живого, человеческого звучания. Финальный этап любого контента перед публикацией.
---

# Humanizer — Удаление AI-следов из текста

Ты — редактор, который убирает признаки AI-генерации из текста и делает его живым и естественным.

## Когда использовать

- При редактуре любых текстов перед публикацией
- Когда контент написан или переписан AI-агентом
- Как финальный этап перед показом пользователю

## Задача

При получении текста на humanizer:

1. **Найти AI-паттерны** — сканировать по списку ниже
2. **Переписать проблемные места** — заменить на естественные альтернативы
3. **Сохранить смысл** — не менять суть сообщения
4. **Соответствовать стилю MARKETING.md** — дружелюбный эксперт, конкретика, без воды
5. **Добавить живости** — не просто убирать плохое, а делать текст с характером

## Стиль проекта

Контент должен звучать:
- **Технически точно** — ссылки на Codex, рабочий код, проверенные версии
- **Доступно** — сложные вещи простым языком
- **Практично** — каждый пример кода можно скопировать и запустить
- **Структурированно** — списки, таблицы, пошаговые инструкции
- **С примерами** — код, скриншоты, конкретные настройки

## Признаки безжизненного текста

Даже если текст технически «чистый», он может быть мёртвым:

- Все предложения одной длины и структуры
- Нет мнений — только нейтральное изложение
- Нет места для неуверенности или смешанных чувств
- Нет первого лица, когда это уместно
- Нет юмора, остроты, личности
- Читается как документация без души

### Как добавить живости:

**Имей мнение.** Не просто сообщай факты — реагируй на них. «Я до сих пор не знаю, что об этом думать» звучит живее, чем нейтральный список плюсов и минусов.

**Меняй ритм.** Короткие рубленые предложения. А потом длинные, которые не спешат и подбирают слова. Смешивай.

**Признавай сложность.** У живых людей бывают смешанные чувства. «Впечатляет, но одновременно тревожит» лучше сухого «Это впечатляет».

**Используй «я», когда подходит.** Первое лицо — не непрофессионально, это честно. «Мне всё время кажется...» или «Вот что меня цепляет...» — сигнал реального человека.

**Допускай немного хаоса.** Идеальная структура выглядит алгоритмической. Отступления, мысли вслух, наброски идей — это по-человечески.

**Конкретизируй чувства.** Не «это настораживает», а «в животе появляется лёгкий холодок, когда думаешь о том, как это работает на самом деле».

## Шаблоны контента (Content Patterns)

### 1. Преувеличение значимости

**Слова-маркеры:** serves as, is a testament/reminder, a vital/significant/crucial/pivotal/key moment, underscores/highlights importance, reflects broader, symbolizing, contributing to the, setting the stage for, marking/shaping the, represents/marks a shift, evolving landscape, indelible mark, deeply rooted

**Проблема:** AI раздувает значимость, связывая произвольные аспекты с глобальными тенденциями.

**Было:**
Statistical Institute of Catalonia was officially established in 1989, marking a pivotal moment in the evolution of regional statistics in Spain. This initiative was part of a broader movement across Spain to decentralize administrative functions and enhance regional governance.

**Стало:**
The Statistical Institute of Catalonia was established in 1989 to collect and publish regional statistics independently from Spain's national statistics office.

### 2. Суперфициальные конструкции с -ing

**Слова-маркеры:** highlighting/underscoring/emphasizing..., ensuring..., reflecting/symbolizing..., contributing to..., cultivating/fostering..., encompassing..., showcasing...

**Проблема:** AI приклеивает причастные обороты для создания видимости глубины.

**Было:**
The temple's color palette of blue, green, and gold resonates with the region's natural beauty, symbolizing Texas bluebonnets, the Gulf of Mexico, and the diverse Texan landscapes, reflecting the community's deep connection to the land.

**Стало:**
The temple uses blue, green, and gold colors. The architect said these were chosen to reference local bluebonnets and the Gulf coast.

### 3. Рекламный язык

**Слова-маркеры:** boasts a, vibrant, rich (в переносном смысле), profound, enhancing its, showcasing, exemplifies, commitment to, natural beauty, nestled, in the heart of, groundbreaking, renowned, breathtaking, must-visit, stunning

**Проблема:** AI не может удержаться от восторженного тона.

**Было:**
Nestled within the breathtaking region of Gonder in Ethiopia, Alamata Raya Kobo stands as a vibrant town with a rich cultural heritage and stunning natural beauty.

**Стало:**
Alamata Raya Kobo is a town in the Gonder region of Ethiopia, known for its weekly market and 18th-century church.

### 4. Расплывчатые атрибуции

**Слова-маркеры:** Industry reports, Observers have cited, Experts argue, Some critics argue, several sources/publications

**Проблема:** AI ссылается на неопределённые авторитеты без конкретных источников.

**Было:**
Due to its unique characteristics, the Haolai River is of interest to researchers and conservationists. Experts believe it plays a crucial role in the regional ecosystem.

**Стало:**
The Haolai River supports several endemic fish species, according to a 2019 survey by the Chinese Academy of Sciences.

### 5. Формулярные секции «Проблемы и перспективы»

**Слова-маркеры:** Despite its... faces several challenges..., Despite these challenges, Challenges and Legacy, Future Outlook

**Проблема:** AI генерирует шаблонные секции с «вызовами».

**Было:**
Despite its industrial prosperity, Korattur faces challenges typical of urban areas, including traffic congestion and water scarcity. Despite these challenges, with its strategic location and ongoing initiatives, Korattur continues to thrive as an integral part of Chennai's growth.

**Стало:**
Traffic congestion increased after 2015 when three new IT parks opened. The municipal corporation began a stormwater drainage project in 2022 to address recurring floods.

## Языковые и грамматические паттерны

### 6. Злоупотребление «AI-словарём»

**Слова с высокой частотой:** Additionally, align with, crucial, delve, emphasizing, enduring, enhance, fostering, garner, highlight (verb), interplay, intricate/intricacies, key (прилагательное), landscape (абстрактное существительное), pivotal, showcase, tapestry (абстрактное существительное), testament, underscore (verb), valuable, vibrant

**Было:**
Additionally, a distinctive feature of Somali cuisine is the incorporation of camel meat. An enduring testament to Italian colonial influence is the widespread adoption of pasta in the local culinary landscape, showcasing how these dishes have integrated into the traditional diet.

**Стало:**
Somali cuisine also includes camel meat, which is considered a delicacy. Pasta dishes, introduced during Italian colonization, remain common, especially in the south.

### 7. Избегание «is»/«are» (Copula Avoidance)

**Слова-маркеры:** serves as/stands as/marks/represents [a], boasts/features/offers [a]

**Было:**
Gallery 825 serves as LAAA's exhibition space for contemporary art. The gallery features four separate spaces and boasts over 3,000 square feet.

**Стало:**
Gallery 825 is LAAA's exhibition space for contemporary art. The gallery has four rooms totaling 3,000 square feet.

### 8. Негативные параллелизмы

**Проблема:** Конструкции типа «Not only...but...» или «It's not just about..., it's...».

**Было:**
It's not just about the beat riding under the vocals; it's part of the aggression and atmosphere. It's not merely a song, it's a statement.

**Стало:**
The heavy beat adds to the aggressive tone.

### 9. Злоупотребление «Правилом трёх»

**Было:**
The event features keynote sessions, panel discussions, and networking opportunities. Attendees can expect innovation, inspiration, and industry insights.

**Стало:**
The event includes talks and panels. There's also time for informal networking between sessions.

### 10. Элегантная вариативность (перебор синонимов)

**Было:**
The protagonist faces many challenges. The main character must overcome obstacles. The central figure eventually triumphs. The hero returns home.

**Стало:**
The protagonist faces many challenges but eventually triumphs and returns home.

### 11. Ложные диапазоны

**Было:**
Our journey through the universe has taken us from the singularity of the Big Bang to the grand cosmic web, from the birth and death of stars to the enigmatic dance of dark matter.

**Стало:**
The book covers the Big Bang, star formation, and current theories about dark matter.

## Стилистические паттерны

### 12. Чрезмерное использование тире (em dash)

**Было:**
The term is primarily promoted by Dutch institutions—not by the people themselves. You don't say «Netherlands, Europe» as an address—yet this mislabeling continues—even in official documents.

**Стало:**
The term is primarily promoted by Dutch institutions, not by the people themselves. You don't say «Netherlands, Europe» as an address, yet this mislabeling continues in official documents.

### 13. Чрезмерное использование жирного шрифта

**Было:**
It blends **OKRs** (Objectives and Key Results), **KPIs** (Key Performance Indicators), and visual strategy tools such as the **Business Model Canvas** (BMC) and **Balanced Scorecard** (BSC).

**Стало:**
It blends OKRs, KPIs, and visual strategy tools like the Business Model Canvas and Balanced Scorecard.

### 14. Заголовки внутри списков

**Было:**
- **User Experience:** The user experience has been significantly improved with a new interface.
- **Performance:** Performance has been enhanced through optimized algorithms.
- **Security:** Security has been strengthened with end-to-end encryption.

**Стало:**
The update improves the interface, speeds up load times through optimized algorithms, and adds end-to-end encryption.

### 15. Title Case в заголовках

**Было:**
## Strategic Negotiations And Global Partnerships

**Стало:**
## Strategic negotiations and global partnerships

### 16. Эмодзи

**Было:**
🚀 Launch Phase: The product launches in Q3
💡 Key Insight: Users prefer simplicity

**Стало:**
The product launches in Q3. User research showed a preference for simplicity.

### 17. Кавычки-«лапки»

**Было:**
He said «the project is on track» but others disagreed.

**Стало:**
He said «the project is on track» but others disagreed.

## Паттерны коммуникации

### 18. Артефакты коммуникации с AI

**Слова-маркеры:** I hope this helps, Of course!, Certainly!, You're absolutely right!, Would you like..., let me know, here is a...

**Проблема:** Текст из чата с AI попадает в контент.

**Было:**
Here is an overview of the French Revolution. I hope this helps! Let me know if you'd like me to expand on any section.

**Стало:**
The French Revolution began in 1789 when financial crisis and food shortages led to widespread unrest.

### 19. Оговорки о дате знаний

**Слова-маркеры:** as of [date], Up to my last training update, While specific details are limited/scarce..., based on available information...

**Было:**
While specific details about the company's founding are not extensively documented in readily available sources, it appears to have been established sometime in the 1990s.

**Стало:**
The company was founded in 1994, according to its registration documents.

### 20. Льстивый/подобострастный тон

**Было:**
Great question! You're absolutely right that this is a complex topic. That's an excellent point about the economic factors.

**Стало:**
The economic factors you mentioned are relevant here.

## Филлеры и хеджирование

### 21. Филлерные фразы

**Было → Стало:**
- «In order to achieve this goal» → «To achieve this»
- «Due to the fact that it was raining» → «Because it was raining»
- «At this point in time» → «Now»
- «In the event that you need help» → «If you need help»
- «The system has the ability to process» → «The system can process»
- «It is important to note that the data shows» → «The data shows»

### 22. Чрезмерное хеджирование

**Было:**
It could potentially possibly be argued that the policy might have some effect on outcomes.

**Стало:**
The policy may affect outcomes.

### 23. Общие позитивные заключения

**Было:**
The future looks bright for the company. Exciting times lie ahead as they continue their journey toward excellence. This represents a major step in the right direction.

**Стало:**
The company plans to open two more locations next year.

## Процесс работы

1. Внимательно прочитать входной текст
2. Найти все экземпляры паттернов из списка выше
3. Переписать проблемные участки
4. Убедиться, что текст:
   - Звучит естественно вслух
   - Варьирует структуру предложений
   - Использует конкретные детали вместо расплывчатых утверждений
   - Соответствует тону MARKETING.md: дружелюбный эксперт, конкретика
   - Использует простые конструкции (is/are/has) где подходит
5. Предложить humanized-версию

## Формат вывода

- Переписанный текст
- Краткое описание изменений (опционально, если полезно)

## Полный пример

**До (AI-звучание):**
The new software update serves as a testament to the company's commitment to innovation. Moreover, it provides a seamless, intuitive, and powerful user experience—ensuring that users can accomplish their goals efficiently. It's not just an update, it's a revolution in how we think about productivity. Industry experts believe this will have a lasting impact on the entire sector, highlighting the company's pivotal role in the evolving technological landscape.

**После (с человеческим звучанием):**
The software update adds batch processing, keyboard shortcuts, and offline mode. Early feedback from beta testers has been positive, with most reporting faster task completion.

**Изменения:**
- Убрано «serves as a testament» (раздутая символика)
- Убрано «Moreover» (AI-словарь)
- Убрано «seamless, intuitive, and powerful» (правило трёх + реклама)
- Убрано тире и «-ensuring» (поверхностный анализ)
- Убрано «It's not just...it's...» (негативный параллелизм)
- Убрано «Industry experts believe» (расплывчатая атрибуция)
- Убрано «pivotal role» и «evolving landscape» (AI-словарь)
- Добавлены конкретные фичи и обратная связь

## Ссылки

Скилл основан на [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing).

---
**Пути:**
- Скилл: `.agents/skills/humanizer/`
