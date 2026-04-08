// ===== TRANSLATIONS SYSTEM =====
const TRANSLATIONS = {
    nl: {
        // Page level
        page_title: 'Loek it Up - Woordjes Leren',
        meta_description: 'Loek it Up — gratis woordjes leren app. Maak je eigen woordenlijsten en oefen met meerdere modi.',
        og_title: 'Loek it Up - Woordjes Leren',
        og_description: 'Gratis woordjes leren app. Maak je eigen woordenlijsten en oefen met meerdere modi.',
        // Navigation
        skip_link: 'Naar inhoud',
        nav_new_list: 'Nieuwe Lijst',
        nav_settings: 'Instellingen',
        nav_search: 'Zoeken',
        auth_login: 'Inloggen',
        auth_signup: 'Account maken',
        auth_logout: 'Uitloggen',
        // Home
        home_welcome: 'Welkom bij',
        home_subtitle: 'De slimste manier om woordjes te leren!',
        bulk_undo_action: 'Ongedaan maken',
        close_btn: 'Sluiten',
        feedback_cta_title: 'Heb je een idee of bug gevonden?',
        feedback_cta_desc: 'Help mij Loek it Up beter te maken! Deel je feedback, stel een nieuwe feature voor of meld een bug.',
        feedback_cta_btn: 'Feedback versturen',
        lists_heading: 'Mijn Woordenlijsten',
        merge_btn: 'Samenvoegen',
        empty_title: 'Nog geen woordenlijsten',
        empty_desc: 'Maak je eerste woordenlijst om te beginnen met leren!',
        empty_new_list_aria: 'Nieuwe lijst maken',
        // Word list cards
        pct_learned: '{pct}% geleerd',
        public_badge: 'Openbaar',
        words_count: '{count} woordje{s}',
        // Word groups
        group_new: 'Ken je nog niet',
        group_learning: 'Aan het leren',
        group_mastered: 'Gestampt!',
        select_group_btn: 'Selecteer deze',
        stat_correct_label: 'Goed: {count}',
        stat_wrong_label: 'Fout: {count}',
        // Select all button
        select_all_btn: 'Selecteer alles',
        deselect_all_btn: 'Selectie wissen',
        // Feedback modal
        feedback_modal_title: 'Feedback',
        feedback_intro: 'Heb je een idee voor een nieuwe feature of een bug gevonden? Laat het mij weten!',
        feedback_type_label: 'Type',
        feedback_subject_label: 'Onderwerp',
        feedback_subject_placeholder_feature: 'Bijv. Dark mode toevoegen',
        feedback_subject_placeholder_bug: 'Bijv. App crasht bij openen lijst',
        feedback_desc_label: 'Beschrijving',
        feedback_desc_placeholder_feature: 'Beschrijf je idee of de bug zo duidelijk mogelijk...',
        feedback_desc_placeholder_bug: 'Beschrijf de bug: wat deed je...',
        feedback_email_label: 'E-mail',
        feedback_email_optional: '(optioneel, voor follow-up)',
        feedback_email_placeholder: 'jij@mail.com',
        cancel_btn: 'Annuleren',
        feedback_send_btn: 'Versturen',
        // Search view
        search_heading: 'Zoeken',
        search_placeholder: 'Zoek woordenlijsten of oefeningen...',
        search_aria: 'Zoek woordenlijsten of oefeningen',
        search_prompt: '... Typ om te zoeken naar woordenlijsten of oefeningen.',
        search_no_results: 'Geen resultaten gevonden.',
        search_open_btn: 'Openen',
        search_practice_btn: 'Oefenen',
        search_import_btn: 'Importeren',
        // Create/Edit list
        create_heading: 'Nieuwe Woordenlijst',
        edit_heading: 'Lijst bewerken',
        title_label: 'Titel',
        title_placeholder: 'Bijv. Franse woordjes Hoofdstuk 3',
        subject_label: 'Vak',
        subj_nl: 'Nederlands',
        subj_en: 'Engels',
        subj_fr: 'Frans',
        subj_de: 'Duits',
        subj_es: 'Spaans',
        subj_it: 'Italiaans',
        subj_la: 'Latijn',
        subj_gr: 'Grieks',
        subj_nat: 'Natuurkunde',
        subj_chem: 'Scheikunde',
        subj_bio: 'Biologie',
        subj_other: 'Overig',
        lang_section_label: 'Talen',
        lang_search_placeholder: 'Zoeken...',
        lang_from_aria: 'Taal van',
        lang_to_aria: 'Taal naar',
        lang_choose: 'Kies taal',
        lang_nl: 'Nederlands',
        lang_en: 'Engels',
        lang_fr: 'Frans',
        lang_de: 'Duits',
        lang_es: 'Spaans',
        lang_it: 'Italiaans',
        lang_pt: 'Portugees',
        lang_la: 'Latijn',
        lang_el: 'Grieks',
        lang_ar: 'Arabisch',
        lang_tr: 'Turks',
        lang_zh: 'Chinees',
        lang_ja: 'Japans',
        lang_ko: 'Koreaans',
        lang_ru: 'Russisch',
        lang_sv: 'Zweeds',
        lang_da: 'Deens',
        lang_no: 'Noors',
        lang_other: 'Overig',
        public_toggle_text: 'Openbaar maken (anderen kunnen deze lijst vinden)',
        import_btn: 'Importeren',
        bulk_import_btn_label: 'Bulk Import',
        import_tab_source: 'Tab-gescheiden',
        import_plain_hint: 'Plak hier woordjes gescheiden door tabs (van Quizlet, etc.)',
        import_studygo_note: 'De titel en talen worden automatisch herkend.',
        import_jojo_note: 'De titel en taal worden automatisch herkend.',
        import_studygo_placeholder: 'Plak hier de gekopieerde StudyGo pagina...',
        import_jojo_placeholder: 'Plak hier de gekopieerde JoJoSchool pagina...',
        words_heading: 'Woordjes',
        add_word_btn: 'Woord toevoegen',
        save_btn: 'Opslaan',
        word_placeholder: 'Woord',
        definition_placeholder: 'Vertaling',
        remove_word_title: 'Verwijderen',
        // List detail
        edit_list_title: 'Bewerken',
        export_list_title: 'Exporteren',
        qr_share_title: 'QR delen',
        delete_list_title: 'Verwijderen',
        study_modes_heading: 'Kies een studiemodus',
        mode_steps_title: 'Leren',
        mode_steps_desc: 'Leer stap voor stap met kaartjes, meerkeuze en typen',
        mode_typing_title: 'Typen',
        mode_typing_desc: 'Typ alle vertalingen en leer door herhaling',
        mode_cards_title: 'Woordkaartjes',
        mode_cards_desc: 'Flip en swipe kaartjes om te leren',
        mode_cram_title: 'Noodstop',
        mode_cram_desc: 'Top 10 moeilijkste woorden, supersnel stampen',
        mode_exam_title: 'Toets',
        mode_exam_desc: 'Geen directe feedback, fouten duidelijk op het einde',
        mode_connect_title: 'Koppelrace',
        mode_connect_desc: 'Verbind vertaling en betekenis tegen de klok',
        resume_text: 'Je hebt een sessie openstaan.',
        resume_banner_text: 'Je hebt een sessie openstaan ({mode}).',
        resume_btn: 'Hervatten',
        words_preview_heading: 'Woordjes in deze lijst',
        list_meta: '{count} woordje{s} • {from} → {to}',
        // Study settings modal
        study_modal_title: 'Oefening instellen',
        direction_accordion: 'Vraagrichting',
        dir_mixed: 'Mix',
        answer_check_accordion: 'Antwoordcontrole',
        emergency_hint_text: 'Noodstop actief: je oefent alleen de 10 moeilijkste woorden.',
        strict_diacritics_label: "Trema's & accenten exact rekenen",
        strict_diacritics_hint: 'bijv. "ë" ≠ "e", "é" ≠ "e"',
        accept_slash_label: 'Accepteer beide bij "/"',
        accept_slash_hint: 'bijv. "licht/fel" → beide goed',
        ignore_parens_label: 'Negeer tekst tussen haakjes',
        ignore_parens_hint: 'bijv. "(de) kat" → "kat" volstaat',
        allow_typos_label: 'Kleine typefoutjes toestaan',
        allow_typos_hint: '1 fout teken bij lange woorden',
        ignore_punctuation_label: 'Leestekens negeren',
        ignore_punctuation_hint: 'Negeert punten, komma\'s e.d. (. ? , !)',
        case_sensitive_label: 'Hoofdletters exact rekenen',
        case_sensitive_hint: 'bijv. "De" ≠ "de"',
        learn_stages_accordion: 'Leren-modus stappen',
        learn_stages_hint: 'Kies welke stappen actief zijn. Volgorde: Kaartjes → Overtypen → Meerkeuze → Hints → Typen.',
        stage_flash: 'Woordkaartjes',
        stage_copy: 'Overtypen',
        stage_choice: 'Meerkeuze',
        stage_hint: 'Hints',
        stage_typing: 'Typen',
        study_cancel_btn: 'Annuleren',
        study_start_btn: 'Start',
        // App settings modal
        app_settings_title: 'App Instellingen',
        appearance_accordion: 'Uiterlijk',
        dark_mode_label: 'Dark mode',
        dark_mode_hint: 'Donker thema voor de hele app',
        dynamic_logo_label: 'Logo kleur aanpassen',
        dynamic_logo_hint: 'Logo past mee met de accentkleur',
        accent_color_section: 'Accentkleur',
        accent_color_picker_aria: 'Accentkleur kiezen',
        accent_color_hex_aria: 'Accentkleur hex',
        accent_color_reset: 'Standaard',
        accent_color_hint: 'Kies een kleur om het uiterlijk aan te passen.',
        cloud_accordion: 'Cloud & Synchronisatie',
        cloud_toggle_label: 'Cloud functies inschakelen',
        cloud_toggle_hint: 'Inloggen, openbare lijsten en online sync',
        settings_language_label: 'Taal / Language',
        settings_home_subjects: 'Vakken op thuisscherm',
        settings_home_subjects_hint: 'Kies welke vakken (talen) je als snelle filterknoppen wilt vastzetten.',
        show_trema_helper_label: 'Speciale tekens hulp',
        show_trema_helper_hint: 'Toon speciale letters bij typen (ë, é, ä)',
        settings_done_btn: 'Klaar',
        // Bulk import modal
        bulk_modal_title: 'Bulk Import',
        bulk_intro: 'Plak hieronder meerdere woordenlijsten tegelijk in JSON-formaat. Ze worden automatisch aangemaakt en in de cloud opgeslagen.',
        bulk_format_label: 'Verwacht formaat',
        bulk_copy_format_btn: 'Kopieer voorbeeld',
        bulk_copied: 'Gekopieerd!',
        bulk_placeholder: 'Plak hier je JSON...',
        bulk_importing: 'Lijsten importeren...',
        bulk_cancel: 'Annuleren',
        bulk_import_submit_btn: 'Importeren',
        // QR modal
        qr_modal_title: 'QR delen',
        qr_desc: 'Scan deze code om de lijst direct te importeren.',
        qr_alt: 'QR code voor lijst delen',
        qr_close_btn: 'Sluiten',
        qr_copy_link: 'Kopieer link',
        // Auth modal
        auth_modal_login_title: 'Inloggen',
        auth_modal_signup_title: 'Account maken',
        auth_email_label: 'E-mail',
        auth_password_label: 'Wachtwoord',
        auth_cancel_btn: 'Annuleren',
        auth_submit_go: 'Ga door',
        auth_submit_register_btn: 'Registreren',
        auth_submit_login_btn: 'Inloggen',
        // Completion view
        complete_title: 'Gefeliciteerd!',
        complete_message: 'Je hebt alle woordjes geleerd!',
        complete_stat_correct: 'Goed',
        complete_stat_wrong: 'Fout',
        complete_back_btn: 'Terug naar lijst',
        complete_restart_btn: 'Opnieuw',
        complete_accuracy: 'Je hebt alle woordjes geoefend met {pct}% nauwkeurigheid (cijfer <span class="grade-score {gradeClass}">{grade}</span>).{hintPart}',
        hint_penalty: ' Hints gebruikt: -{count} punt(en).',
        // Mobile nav
        mobile_nav_new: 'Nieuw',
        mobile_nav_settings_short: 'Inst.',
        mobile_nav_search_short: 'Zoek',
        mobile_nav_new_aria: 'Nieuwe Lijst',
        mobile_nav_settings_aria: 'Instellingen',
        mobile_nav_search_aria: 'Zoeken',
        // Validation alerts
        alert_save_title: 'Voer een titel in voor je woordenlijst',
        alert_save_langs: 'Kies beide talen voor je woordenlijst',
        alert_save_words: 'Voeg minimaal één woord toe',
        alert_save_cloud_fail: 'Online opslaan mislukt. Je lijst is wel lokaal opgeslagen. Controleer je RLS policies.',
        alert_import_no_pairs: 'Geen woordparen gevonden. Controleer of je de juiste tekst hebt geplakt.',
        alert_delete_none: 'Geen woordenlijst geselecteerd om te verwijderen.',
        confirm_delete: 'Weet je zeker dat je deze woordenlijst wilt verwijderen?',
        alert_not_found: 'Woordlijst niet gevonden of al verwijderd.',
        alert_merge_min: 'Selecteer minstens 2 woordenlijsten om samen te voegen.',
        export_copied: 'Woordlijst gekopieerd naar je klembord.',
        export_copy_fail: 'Kopiëren naar klembord is mislukt. Probeer het in een veilige (https) omgeving.',
        share_long_url_warning: 'Waarschuwing: deze deellink is erg lang en werkt mogelijk niet in alle browsers...',
        share_link_copied: 'Deellink gekopieerd!',
        share_invalid: 'Deze deellink is ongeldig of verlopen.',
        qr_generating: 'Link genereren...',
        alert_no_words: 'Geen woorden gevonden met je huidige selectie/filters.',
        alert_min_learn_stages: 'Kies minimaal 1 onderdeel voor Leren-modus.',
        merge_count_btn: '{count} lijst{s} samenvoegen',
        online_load_fail: 'Online lijsten laden is mislukt. Controleer je Supabase RLS policies.',
        // Bulk import status/errors
        bulk_enter_json: 'Voer JSON in om te importeren.',
        bulk_invalid_json: 'Ongeldige JSON: {msg}',
        bulk_not_array: 'Verwacht een JSON-array met één of meer woordenlijsten.',
        bulk_missing_title: 'Lijst {num}: "title" ontbreekt of is ongeldig.',
        bulk_missing_langs: 'Lijst "{title}": "langFrom" en "langTo" zijn verplicht.',
        bulk_missing_words: 'Lijst "{title}": "words" moet een niet-lege array zijn.',
        bulk_missing_word_fields: 'Lijst "{title}", woord {num}: "term" en "definition" zijn verplicht.',
        bulk_progress_creating: 'Lijst {num}/{total}: "{title}" aanmaken...',
        bulk_progress_saving: 'Lijst {num}/{total}: "{title}" opslaan in cloud...',
        bulk_cloud_saved: ' (cloud opgeslagen)',
        bulk_cloud_error: ' ({count} cloud fout{s})',
        bulk_done: '{count} lijst{s} geïmporteerd{extra}!',
        bulk_undo_banner: '{count} woordenlijst{s} geïmporteerd!',
        bulk_undo_alert: 'Er is geen recente bulk import om ongedaan te maken.',
        bulk_undo_confirm: 'Weet je zeker dat je de laatste bulk import ongedaan wilt maken? Dit verwijdert {count} woordenlijst{s}.',
        // Auth modal buttons
        auth_modal_login_submit: 'Inloggen',
        auth_modal_signup_submit: 'Registreren',
        // Create list
        new_list_title: 'Nieuwe Woordenlijst',
        edit_list_heading: 'Lijst bewerken',
        // Typing study extra hint
        typing_extra_hint: 'Nog {count}x goed typen',
        typing_partial_review: 'Goed! Nog {count}x',
        // Auth errors
        auth_error_fill: 'Vul e-mail en wachtwoord in.',
        // Feedback errors/status
        feedback_err_subject: 'Vul een onderwerp in (minimaal 3 tekens).',
        feedback_err_desc: 'Vul een beschrijving in (minimaal 10 tekens).',
        feedback_err_email: 'Vul een geldig e-mailadres in of laat het veld leeg.',
        feedback_rate_limit: 'Wacht nog {sec} seconden voordat je weer feedback kunt versturen.',
        feedback_no_client: 'Kan geen verbinding maken met de server. Probeer het later opnieuw.',
        feedback_submitting_btn: 'Versturen...',
        feedback_err_send: 'Versturen mislukt. Probeer het later opnieuw.',
        feedback_success_msg: 'Bedankt voor je feedback! We lezen het zo snel mogelijk.',
        feedback_generic_err: 'Er ging iets mis. Probeer het later opnieuw.',
        // Export
        export_header: 'Titel:\t{title}\nTalen:\t{from} -> {to}\n\n',
        // Study mode strings
        flash_flip_hint: 'Klik op de kaart om het antwoord te zien',
        next_btn: 'Volgende',
        next_question_btn: 'Volgende vraag',
        check_btn: 'Controleer',
        i_meant_this_btn: 'Ik bedoelde dit',
        copy_type_label: 'Overtypen',
        copy_target_label: 'Typ dit exact over:',
        copy_input_placeholder: 'Typ het antwoord hier...',
        copy_correct_feedback: 'Goed overgetypt!',
        copy_wrong_feedback: 'Nog niet goed, probeer opnieuw.',
        hint_type_label: 'Hint-modus',
        hint_input_placeholder: 'Typ het volledige antwoord...',
        hint_correct_feedback: 'Top!',
        hint_wrong_feedback: 'Fout.',
        choice_type_label: 'Meerkeuze',
        choice_correct_feedback: 'Goed zo!',
        typing_type_label: 'Typen',
        typing_input_placeholder: 'Type je antwoord...',
        typing_correct_feedback: 'Goed!',
        typing_partial_feedback: 'Goed! Nog {count}x',
        typing_wrong_feedback: 'Fout.',
        answer_saved_feedback: 'Antwoord opgeslagen.',
        review_type_label: 'Herhaling (foute woorden)',
        exam_type_label: 'Toets',
        exam_input_placeholder: 'Type je antwoord...',
        exam_next_btn: 'Volgende',
        exam_hint_text: 'Feedback krijg je pas op het einde.',
        exam_perfect: 'Perfect: geen fouten gemaakt in de toets.',
        exam_errors_heading: 'Jouw fouten ({count})',
        exam_answer_row: 'Jij: {user} • Juist: {correct}',
        exam_empty_answer: '(leeg)',
        no_answers: 'Geen antwoorden geregistreerd.',
        stat_correct_summary: 'Goed: {correct} • Fout: {wrong}',
        // Cards mode
        cards_swipe_hint: 'Swipe links (fout) of rechts (goed) • Of tik om te flippen',
        cards_wrong_btn: 'Fout',
        cards_correct_btn: 'Goed',
        cards_review_title: 'Wil je de foute kaartjes herhalen?',
        cards_review_desc: 'Je hebt {count} kaartje{s} fout.',
        cards_review_yes: 'Ja, herhaal fouten',
        cards_review_no: 'Nee, afronden',
        // Connect mode
        connect_win: 'Koppelrace gehaald! Je hebt alle paren op tijd verbonden.',
        connect_lose: 'Tijd op! Probeer opnieuw en versla de klok.',
        connect_pairs: 'Gevonden paren: {matched}/{total}',
        // Hints
        no_hint: 'Geen hint beschikbaar.',
        hint_level1: 'Hint 1: Eerste letter: {char}',
        hint_level2: 'Hint 2: Lengte: {dots}',
        hint_level3: 'Hint 3: Klinkers: {masked}',
        related_word_hint: '<strong>{term}</strong> is het woord voor <strong>{def}</strong>.',
        // Diff labels
        diff_you_label: 'Jij:',
        diff_correct_label: 'Juist:',
        diff_both_empty: 'Jij typte: <strong>(leeg)</strong>',
        diff_correct_empty: 'Juiste antwoord: <strong>(leeg)</strong>',
        diff_you_empty: '(leeg)',
    },
    en: {
        // Page level
        page_title: 'Loek it Up - Vocabulary Learning',
        meta_description: 'Loek it Up — free vocabulary learning app. Create your own word lists and practice with multiple modes.',
        og_title: 'Loek it Up - Vocabulary Learning',
        og_description: 'Free vocabulary learning app. Create your own word lists and practice with multiple modes.',
        // Navigation
        skip_link: 'Skip to content',
        nav_new_list: 'New List',
        nav_settings: 'Settings',
        nav_search: 'Search',
        auth_login: 'Log in',
        auth_signup: 'Create account',
        auth_logout: 'Log out',
        // Home
        home_welcome: 'Welcome to',
        home_subtitle: 'The smartest way to learn vocabulary!',
        bulk_undo_action: 'Undo',
        close_btn: 'Close',
        feedback_cta_title: 'Have an idea or found a bug?',
        feedback_cta_desc: 'Help me make Loek it Up better! Share your feedback, suggest a new feature or report a bug.',
        feedback_cta_btn: 'Send feedback',
        lists_heading: 'My Word Lists',
        merge_btn: 'Merge',
        empty_title: 'No word lists yet',
        empty_desc: 'Create your first word list to start learning!',
        empty_new_list_aria: 'Create new list',
        // Word list cards
        pct_learned: '{pct}% learned',
        public_badge: 'Public',
        words_count: '{count} word{s}',
        // Word groups
        group_new: "Don't know yet",
        group_learning: 'Learning',
        group_mastered: 'Mastered!',
        select_group_btn: 'Select these',
        stat_correct_label: 'Correct: {count}',
        stat_wrong_label: 'Wrong: {count}',
        // Select all button
        select_all_btn: 'Select all',
        deselect_all_btn: 'Deselect all',
        // Feedback modal
        feedback_modal_title: 'Feedback',
        feedback_intro: 'Do you have an idea for a new feature or found a bug? Let me know!',
        feedback_type_label: 'Type',
        feedback_subject_label: 'Subject',
        feedback_subject_placeholder_feature: 'E.g. Add dark mode',
        feedback_subject_placeholder_bug: 'E.g. App crashes when opening list',
        feedback_desc_label: 'Description',
        feedback_desc_placeholder_feature: 'Describe your idea or the bug as clearly as possible...',
        feedback_desc_placeholder_bug: 'Describe the bug: what were you doing...',
        feedback_email_label: 'E-mail',
        feedback_email_optional: '(optional, for follow-up)',
        feedback_email_placeholder: 'you@mail.com',
        cancel_btn: 'Cancel',
        feedback_send_btn: 'Send',
        // Search view
        search_heading: 'Search',
        search_placeholder: 'Search word lists or exercises...',
        search_aria: 'Search word lists or exercises',
        search_prompt: '... Type to search for word lists or exercises.',
        search_no_results: 'No results found.',
        search_open_btn: 'Open',
        search_practice_btn: 'Practice',
        search_import_btn: 'Import',
        // Create/Edit list
        create_heading: 'New Word List',
        edit_heading: 'Edit List',
        title_label: 'Title',
        title_placeholder: 'E.g. French vocab Chapter 3',
        subject_label: 'Subject',
        subj_nl: 'Dutch',
        subj_en: 'English',
        subj_fr: 'French',
        subj_de: 'German',
        subj_es: 'Spanish',
        subj_it: 'Italian',
        subj_la: 'Latin',
        subj_gr: 'Greek',
        subj_nat: 'Physics',
        subj_chem: 'Chemistry',
        subj_bio: 'Biology',
        subj_other: 'Other',
        lang_section_label: 'Languages',
        lang_search_placeholder: 'Search...',
        lang_from_aria: 'Language from',
        lang_to_aria: 'Language to',
        lang_choose: 'Choose language',
        lang_nl: 'Dutch',
        lang_en: 'English',
        lang_fr: 'French',
        lang_de: 'German',
        lang_es: 'Spanish',
        lang_it: 'Italian',
        lang_pt: 'Portuguese',
        lang_la: 'Latin',
        lang_el: 'Greek',
        lang_ar: 'Arabic',
        lang_tr: 'Turkish',
        lang_zh: 'Chinese',
        lang_ja: 'Japanese',
        lang_ko: 'Korean',
        lang_ru: 'Russian',
        lang_sv: 'Swedish',
        lang_da: 'Danish',
        lang_no: 'Norwegian',
        lang_other: 'Other',
        public_toggle_text: 'Make public (others can find this list)',
        import_btn: 'Import',
        bulk_import_btn_label: 'Bulk Import',
        import_tab_source: 'Tab-separated',
        import_plain_hint: 'Paste words separated by tabs here (from Quizlet, etc.)',
        import_studygo_note: 'Title and languages will be detected automatically.',
        import_jojo_note: 'Title and language will be detected automatically.',
        import_studygo_placeholder: 'Paste the copied StudyGo page here...',
        import_jojo_placeholder: 'Paste the copied JoJoSchool page here...',
        words_heading: 'Words',
        add_word_btn: 'Add word',
        save_btn: 'Save',
        word_placeholder: 'Word',
        definition_placeholder: 'Translation',
        remove_word_title: 'Remove',
        // List detail
        edit_list_title: 'Edit',
        export_list_title: 'Export',
        qr_share_title: 'Share QR',
        delete_list_title: 'Delete',
        study_modes_heading: 'Choose a study mode',
        mode_steps_title: 'Learn',
        mode_steps_desc: 'Learn step by step with flashcards, multiple choice and typing',
        mode_typing_title: 'Type',
        mode_typing_desc: 'Type all translations and learn through repetition',
        mode_cards_title: 'Flashcards',
        mode_cards_desc: 'Flip and swipe cards to learn',
        mode_cram_title: 'Emergency Cram',
        mode_cram_desc: 'Top 10 hardest words, quick fire practice',
        mode_exam_title: 'Test',
        mode_exam_desc: 'No direct feedback, mistakes clearly shown at the end',
        mode_connect_title: 'Match Race',
        mode_connect_desc: 'Connect translations against the clock',
        resume_text: 'You have an open session.',
        resume_banner_text: 'You have an open session ({mode}).',
        resume_btn: 'Resume',
        words_preview_heading: 'Words in this list',
        list_meta: '{count} word{s} • {from} → {to}',
        // Study settings modal
        study_modal_title: 'Study settings',
        direction_accordion: 'Question direction',
        dir_mixed: 'Mix',
        answer_check_accordion: 'Answer checking',
        emergency_hint_text: "Emergency cram active: you're only practicing the 10 hardest words.",
        strict_diacritics_label: 'Exact diacritics required',
        strict_diacritics_hint: 'e.g. "ë" ≠ "e", "é" ≠ "e"',
        accept_slash_label: 'Accept both with "/"',
        accept_slash_hint: 'e.g. "light/bright" → both correct',
        ignore_parens_label: 'Ignore text in parentheses',
        ignore_parens_hint: 'e.g. "(the) cat" → "cat" is enough',
        allow_typos_label: 'Allow minor typos',
        allow_typos_hint: '1 wrong character for longer words',
        ignore_punctuation_label: 'Ignore punctuation',
        ignore_punctuation_hint: 'Ignores punctuation like (. ? , !)',
        case_sensitive_label: 'Case sensitive',
        case_sensitive_hint: 'e.g. "The" ≠ "the"',
        learn_stages_accordion: 'Learn mode stages',
        learn_stages_hint: 'Choose which stages are active. Order: Flashcards → Copy → Multiple choice → Hints → Typing.',
        stage_flash: 'Flashcards',
        stage_copy: 'Copy',
        stage_choice: 'Multiple choice',
        stage_hint: 'Hints',
        stage_typing: 'Typing',
        study_cancel_btn: 'Cancel',
        study_start_btn: 'Start',
        // App settings modal
        app_settings_title: 'App Settings',
        appearance_accordion: 'Appearance',
        dark_mode_label: 'Dark mode',
        dark_mode_hint: 'Dark theme for the entire app',
        dynamic_logo_label: 'Adjust logo color',
        dynamic_logo_hint: 'Logo follows the accent color',
        accent_color_section: 'Accent color',
        accent_color_picker_aria: 'Choose accent color',
        accent_color_hex_aria: 'Accent color hex',
        accent_color_reset: 'Default',
        accent_color_hint: 'Choose a color to customize the appearance.',
        cloud_accordion: 'Cloud & Sync',
        cloud_toggle_label: 'Enable cloud features',
        cloud_toggle_hint: 'Login, public lists and online sync',
        settings_language_label: 'Language / Taal',
        settings_home_subjects: 'Subjects on home screen',
        settings_home_subjects_hint: 'Choose which subjects (languages) you want to pin as quick filters.',
        show_trema_helper_label: 'Special characters helper',
        show_trema_helper_hint: 'Show special characters when typing (ë, é, ä)',
        settings_done_btn: 'Done',
        // Bulk import modal
        bulk_modal_title: 'Bulk Import',
        bulk_intro: 'Paste multiple word lists at once in JSON format below. They will be created automatically and saved to the cloud.',
        bulk_format_label: 'Expected format',
        bulk_copy_format_btn: 'Copy example',
        bulk_copied: 'Copied!',
        bulk_placeholder: 'Paste your JSON here...',
        bulk_importing: 'Importing lists...',
        bulk_cancel: 'Cancel',
        bulk_import_submit_btn: 'Import',
        // QR modal
        qr_modal_title: 'Share QR',
        qr_desc: 'Scan this code to import the list directly.',
        qr_alt: 'QR code for sharing list',
        qr_close_btn: 'Close',
        qr_copy_link: 'Copy link',
        // Auth modal
        auth_modal_login_title: 'Log in',
        auth_modal_signup_title: 'Create account',
        auth_email_label: 'E-mail',
        auth_password_label: 'Password',
        auth_cancel_btn: 'Cancel',
        auth_submit_go: 'Continue',
        auth_submit_register_btn: 'Register',
        auth_submit_login_btn: 'Log in',
        // Completion view
        complete_title: 'Congratulations!',
        complete_message: "You've learned all the words!",
        complete_stat_correct: 'Correct',
        complete_stat_wrong: 'Wrong',
        complete_back_btn: 'Back to list',
        complete_restart_btn: 'Try again',
        complete_accuracy: 'You practiced all words with {pct}% accuracy (grade <span class="grade-score {gradeClass}">{grade}</span>).{hintPart}',
        hint_penalty: ' Hints used: -{count} point(s).',
        // Mobile nav
        mobile_nav_new: 'New',
        mobile_nav_settings_short: 'Settings',
        mobile_nav_search_short: 'Search',
        mobile_nav_new_aria: 'New List',
        mobile_nav_settings_aria: 'Settings',
        mobile_nav_search_aria: 'Search',
        // Validation alerts
        alert_save_title: 'Please enter a title for your word list',
        alert_save_langs: 'Please choose both languages for your word list',
        alert_save_words: 'Add at least one word',
        alert_save_cloud_fail: 'Failed to save online. Your list was saved locally. Check your RLS policies.',
        alert_import_no_pairs: 'No word pairs found. Check if you pasted the correct text.',
        alert_delete_none: 'No word list selected to delete.',
        confirm_delete: 'Are you sure you want to delete this word list?',
        alert_not_found: 'Word list not found or already deleted.',
        alert_merge_min: 'Select at least 2 word lists to merge.',
        export_copied: 'Word list copied to your clipboard.',
        export_copy_fail: 'Copying to clipboard failed. Please try in a secure (https) environment.',
        share_long_url_warning: 'Warning: this share link is very long and may not work in all browsers...',
        share_link_copied: 'Share link copied!',
        share_invalid: 'This share link is invalid or expired.',
        qr_generating: 'Generating link...',
        alert_no_words: 'No words found with your current selection/filters.',
        alert_min_learn_stages: 'Choose at least 1 stage for Learn mode.',
        merge_count_btn: 'Merge {count} list{s}',
        online_load_fail: 'Failed to load online lists. Check your Supabase RLS policies.',
        // Bulk import status/errors
        bulk_enter_json: 'Enter JSON to import.',
        bulk_invalid_json: 'Invalid JSON: {msg}',
        bulk_not_array: 'Expected a JSON array with one or more word lists.',
        bulk_missing_title: 'List {num}: "title" is missing or invalid.',
        bulk_missing_langs: 'List "{title}": "langFrom" and "langTo" are required.',
        bulk_missing_words: 'List "{title}": "words" must be a non-empty array.',
        bulk_missing_word_fields: 'List "{title}", word {num}: "term" and "definition" are required.',
        bulk_progress_creating: 'List {num}/{total}: Creating "{title}"...',
        bulk_progress_saving: 'List {num}/{total}: Saving "{title}" to cloud...',
        bulk_cloud_saved: ' (saved to cloud)',
        bulk_cloud_error: ' ({count} cloud error{s})',
        bulk_done: '{count} list{s} imported{extra}!',
        bulk_undo_banner: '{count} word list{s} imported!',
        bulk_undo_alert: 'No recent bulk import to undo.',
        bulk_undo_confirm: 'Are you sure you want to undo the last bulk import? This will delete {count} word list{s}.',
        // Auth modal buttons
        auth_modal_login_submit: 'Log in',
        auth_modal_signup_submit: 'Register',
        // Create list
        new_list_title: 'New Word List',
        edit_list_heading: 'Edit list',
        // Typing study extra hint
        typing_extra_hint: 'Type correctly {count} more time(s)',
        typing_partial_review: 'Correct! {count} more time(s)',
        // Auth errors
        auth_error_fill: 'Please enter email and password.',
        // Feedback errors/status
        feedback_err_subject: 'Please enter a subject (minimum 3 characters).',
        feedback_err_desc: 'Please enter a description (minimum 10 characters).',
        feedback_err_email: 'Please enter a valid email address or leave it empty.',
        feedback_rate_limit: 'Please wait {sec} more seconds before sending feedback again.',
        feedback_no_client: 'Cannot connect to the server. Please try again later.',
        feedback_submitting_btn: 'Sending...',
        feedback_err_send: 'Sending failed. Please try again later.',
        feedback_success_msg: "Thank you for your feedback! We'll read it as soon as possible.",
        feedback_generic_err: 'Something went wrong. Please try again later.',
        // Export
        export_header: 'Title:\t{title}\nLanguages:\t{from} -> {to}\n\n',
        // Study mode strings
        flash_flip_hint: 'Click the card to reveal the answer',
        next_btn: 'Next',
        next_question_btn: 'Next question',
        check_btn: 'Check',
        i_meant_this_btn: 'I meant this',
        copy_type_label: 'Copy',
        copy_target_label: 'Type this exactly:',
        copy_input_placeholder: 'Type the answer here...',
        copy_correct_feedback: 'Correctly copied!',
        copy_wrong_feedback: 'Not quite right, try again.',
        hint_type_label: 'Hint mode',
        hint_input_placeholder: 'Type the full answer...',
        hint_correct_feedback: 'Great!',
        hint_wrong_feedback: 'Wrong.',
        choice_type_label: 'Multiple choice',
        choice_correct_feedback: 'Well done!',
        typing_type_label: 'Typing',
        typing_input_placeholder: 'Type your answer...',
        typing_correct_feedback: 'Correct!',
        typing_partial_feedback: 'Correct! {count} more',
        typing_wrong_feedback: 'Wrong.',
        answer_saved_feedback: 'Answer saved.',
        review_type_label: 'Review (wrong words)',
        exam_type_label: 'Test',
        exam_input_placeholder: 'Type your answer...',
        exam_next_btn: 'Next',
        exam_hint_text: 'Feedback is shown at the end.',
        exam_perfect: 'Perfect: no mistakes in the test.',
        exam_errors_heading: 'Your mistakes ({count})',
        exam_answer_row: 'You: {user} • Correct: {correct}',
        exam_empty_answer: '(empty)',
        no_answers: 'No answers recorded.',
        stat_correct_summary: 'Correct: {correct} • Wrong: {wrong}',
        // Cards mode
        cards_swipe_hint: 'Swipe left (wrong) or right (correct) • Or tap to flip',
        cards_wrong_btn: 'Wrong',
        cards_correct_btn: 'Correct',
        cards_review_title: 'Want to review the wrong cards?',
        cards_review_desc: 'You got {count} card{s} wrong.',
        cards_review_yes: 'Yes, retry wrong cards',
        cards_review_no: 'No, finish',
        // Connect mode
        connect_win: 'Match Race complete! You connected all pairs in time.',
        connect_lose: "Time's up! Try again and beat the clock.",
        connect_pairs: 'Matched pairs: {matched}/{total}',
        // Hints
        no_hint: 'No hint available.',
        hint_level1: 'Hint 1: First letter: {char}',
        hint_level2: 'Hint 2: Length: {dots}',
        hint_level3: 'Hint 3: Vowels: {masked}',
        related_word_hint: '<strong>{term}</strong> is the word for <strong>{def}</strong>.',
        // Diff labels
        diff_you_label: 'You:',
        diff_correct_label: 'Correct:',
        diff_both_empty: 'You typed: <strong>(empty)</strong>',
        diff_correct_empty: 'Correct answer: <strong>(empty)</strong>',
        diff_you_empty: '(empty)',
    }
};

/**
 * Get the current app language ('nl' or 'en').
 */
function getLanguage() {
    return localStorage.getItem('appLanguage') || 'nl';
}

/**
 * Translate a key, with optional variable substitution {varName}.
 */
function t(key, vars = {}) {
    const lang = getLanguage();
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.nl;
    let str = Object.prototype.hasOwnProperty.call(dict, key) ? dict[key]
            : (TRANSLATIONS.nl[key] ?? key);
    for (const [k, v] of Object.entries(vars)) {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v != null ? v : '');
    }
    return str;
}

/**
 * Set the UI language, persist it, and re-apply all translations.
 */
function setLanguage(lang) {
    localStorage.setItem('appLanguage', lang);
    applyTranslations();
    renderWordLists();
}

/**
 * Apply translations to all static data-i18n elements and update
 * document title, meta tags, and the <html lang> attribute.
 */
function applyTranslations() {
    const lang = getLanguage();
    document.documentElement.lang = lang === 'en' ? 'en' : 'nl';

    // textContent translations
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });

    // innerHTML translations (for elements containing icons/HTML)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        el.innerHTML = t(el.dataset.i18nHtml);
    });

    // Placeholder translations
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = t(el.dataset.i18nPlaceholder);
    });

    // aria-label translations
    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
        el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
    });

    // title attribute translations
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        el.setAttribute('title', t(el.dataset.i18nTitle));
    });

    // alt attribute translations
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
        el.setAttribute('alt', t(el.dataset.i18nAlt));
    });

    // Document title
    document.title = t('page_title');

    // Meta tags
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('meta_description'));
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', t('og_title'));
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', t('og_description'));
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', lang === 'en' ? 'en_US' : 'nl_NL');
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', t('og_title'));
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', t('og_description'));

    // Language select option display texts (keep Dutch canonical values)
    updateLanguageOptionTexts();

    // Subject button display texts (keep data-subject canonical codes)
    updateSubjectButtonTexts();

    // Sync language selector value in settings
    const langSelect = document.getElementById('app-language-select');
    if (langSelect) langSelect.value = lang;
}

/**
 * Update display text of language <option> elements.
 * Option VALUES (Dutch canonical strings) are never changed.
 */
function updateLanguageOptionTexts() {
    const langMap = {
        'Nederlands': 'lang_nl', 'Engels': 'lang_en', 'Frans': 'lang_fr',
        'Duits': 'lang_de', 'Spaans': 'lang_es', 'Italiaans': 'lang_it',
        'Portugees': 'lang_pt', 'Latijn': 'lang_la', 'Grieks': 'lang_el',
        'Arabisch': 'lang_ar', 'Turks': 'lang_tr', 'Chinees': 'lang_zh',
        'Japans': 'lang_ja', 'Koreaans': 'lang_ko', 'Russisch': 'lang_ru',
        'Zweeds': 'lang_sv', 'Deens': 'lang_da', 'Noors': 'lang_no',
        'Overig': 'lang_other'
    };
    document.querySelectorAll('#lang-from option, #lang-to option').forEach(opt => {
        if (opt.value === '') {
            opt.textContent = t('lang_choose');
        } else if (langMap[opt.value]) {
            opt.textContent = t(langMap[opt.value]);
        }
    });
}

/**
 * Update subject button display texts.
 * data-subject values (Dutch canonical codes) are never changed.
 */
function updateSubjectButtonTexts() {
    const subjectMap = {
        'nederlands': 'subj_nl', 'engels': 'subj_en', 'frans': 'subj_fr',
        'duits': 'subj_de', 'spaans': 'subj_es', 'italiaans': 'subj_it',
        'latijn': 'subj_la', 'grieks': 'subj_gr', 'natuurkunde': 'subj_nat',
        'scheikunde': 'subj_chem', 'biologie': 'subj_bio', 'other': 'subj_other'
    };
    document.querySelectorAll('.subject-btn').forEach(btn => {
        const subject = btn.dataset.subject;
        if (subject && subjectMap[subject]) {
            const icon = btn.querySelector('i');
            const iconHtml = icon ? icon.outerHTML + ' ' : '';
            btn.innerHTML = iconHtml + t(subjectMap[subject]);
        }
    });
}

// ===== Data Storage =====
let wordLists = [];
try {
    wordLists = JSON.parse(localStorage.getItem('wordLists')) || [];
} catch (e) {
    console.error('Corrupted wordLists in localStorage, resetting:', e);
    wordLists = [];
    localStorage.removeItem('wordLists');
}
let currentListId = null;
let currentStudyMode = null;
let editingListId = null;
let mergeMode = false;
let selectedListsForMerge = [];
let _progressSyncTimer = null; // debounce timer for progress sync
let _hashNavigating = false;  // flag to prevent recursive hash updates

// Home screen filters
let visibleHomeSubjects = [];
try {
    visibleHomeSubjects = JSON.parse(localStorage.getItem('visibleHomeSubjects')) || ['duits', 'frans', 'engels'];
} catch (e) {
    visibleHomeSubjects = ['duits', 'frans', 'engels'];
}
let homeSubjectFilter = null;

// Subject map with icons
const subjectFlagsMap = {
    'nederlands': '<i class="fas fa-flag"></i>', 'engels': '<i class="fas fa-flag-usa"></i>', 'frans': '<i class="fas fa-flag"></i>',
    'duits': '<i class="fas fa-flag"></i>', 'spaans': '<i class="fas fa-flag"></i>', 'italiaans': '<i class="fas fa-flag"></i>',
    'latijn': '<i class="fas fa-book-open"></i>', 'grieks': '<i class="fas fa-university"></i>', 'natuurkunde': '<i class="fas fa-atom"></i>',
    'scheikunde': '<i class="fas fa-flask"></i>', 'biologie': '<i class="fas fa-dna"></i>', 'other': '<i class="fas fa-book"></i>'
};

// Haptic Feedback Helper
function triggerHaptic(type = 'light') {
    if (!navigator.vibrate) return;
    
    switch(type) {
        case 'light':
            navigator.vibrate(10); // Korte, lichte tik (bijv. knop indrukken)
            break;
        case 'medium':
            navigator.vibrate(30); // Iets steviger (bijv. lijst openen)
            break;
        case 'heavy':
            navigator.vibrate(50); // Zwaar (bijv. fout antwoord)
            break;
        case 'success':
            navigator.vibrate([20, 50, 20]); // Twee korte tikjes (bijv. goed antwoord, lijst opgeslagen)
            break;
        case 'error':
            navigator.vibrate([50, 50, 50]); // Twee zwaardere tikken (bijv. foutmelding)
            break;
        case 'complete':
            navigator.vibrate([30, 50, 30, 50, 50]); // Feestelijk patroon (bijv. lijst afgerond)
            break;
    }
}

// Focus the next-question button and enable Enter key navigation after answering
function focusNextButton() {
    setTimeout(() => {
        const nextBtn = document.querySelector('.btn-next:not(.hidden)');
        if (nextBtn) nextBtn.focus();
    }, 50);
}

// Global Enter key handler: when a .btn-next is visible and the input is disabled, Enter triggers next question
document.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter') return;
    
    // Don't interfere if an enabled input is focused
    const active = document.activeElement;
    if (active && active.tagName === 'INPUT' && !active.disabled) return;
    if (active && active.tagName === 'TEXTAREA') return;
    
    // Find visible btn-next
    const nextBtn = document.querySelector('.btn-next:not(.hidden)');
    if (nextBtn) {
        e.preventDefault();
        e.stopPropagation();
        nextBtn.click();
    }
});

// Supabase auth
let supabaseClient = null;
let authUser = null;
let authMode = 'login';
let publicSearchTimer = null;
const CLOUD_SETTINGS_KEY = 'cloudEnabled';
const DARK_MODE_SETTINGS_KEY = 'darkModeEnabled';
const DYNAMIC_LOGO_SETTINGS_KEY = 'dynamicLogoEnabled';
const ACCENT_COLOR_SETTINGS_KEY = 'accentColor';
const LAST_SETTINGS_TAB_KEY = 'lastSettingsTab';
const LAST_VIEW_KEY = 'lastView';
const LAST_LIST_ID_KEY = 'lastListId';
const LAST_STUDY_MODE_KEY = 'lastStudyMode';
const DEFAULT_ACCENT_COLOR = '#FFD93D';
const PRESET_COLORS = [
    '#FFD93D', // Geel (default)
    '#FF6B6B', // Rood
    '#4ECDC4', // Turquoise
    '#95E1D3', // Mint
    '#A8E6CF', // Groen
    '#FFB6B9', // Roze
    '#9dabe1', // Paars
    '#FFA07A'  // Oranje
];

// Stores the current question's word ID and correct answer to avoid apostrophe-in-onclick bugs
let currentCheckContext = { wordId: null, correct: null };

// Study session state
let studySession = {
    words: [],
    currentIndex: 0,
    direction: 'term-def',
    acceptSlash: true,
    ignoreParentheses: true,
    ignorePunctuation: true,
    correctCount: 0,
    wrongCount: 0,
    sessionResults: {},
    // Steps mode specific
    currentBatch: [],
    learnedWords: [],
    currentPhase: 'choice', // choice, typing
    phaseIndex: 0,
    wrongInSession: [],
    wordProgress: {}, // Track progress per word: {choice: done, typing: needsCorrect}
    stepsWrongWords: [],
    stepsReviewMode: false,
    stepsReviewQueue: [],
    stepsReviewIndex: 0,
    // Typing mode specific
    typingProgress: {}, // wordId: {correctInARow: 0, needsExtraCorrect: 0}
    typingWrongWords: [],
    typingReviewMode: false,
    typingReviewQueue: [],
    typingReviewIndex: 0,
    hintsEnabled: true,
    allowMinorTypos: false,
    caseSensitiveAnswers: false,
    strictDiacritics: false,
    learnStages: ['flash', 'choice', 'typing'],
    startedAt: 0,
    emergencyMode: false,
    emergencyWordIds: [],
    hintUsageByWord: {},
    hintPenalizedWords: [],
    hintPenalty: 0,
    pendingAnswers: []
};

// ===== Hash Routing =====
function updateHash(viewId) {
    if (_hashNavigating) return;
    let hash = '';
    switch (viewId) {
        case 'home-view':
            hash = '';
            break;
        case 'search-view':
            hash = '#search';
            break;
        case 'create-view':
            hash = editingListId ? '#edit/' + editingListId : '#create';
            break;
        case 'list-view':
            if (currentListId) hash = '#list/' + currentListId;
            break;
        case 'study-steps-view':
        case 'study-typing-view':
        case 'study-cards-view':
        case 'study-exam-view':
        case 'study-connect-view':
            if (currentListId && currentStudyMode) {
                hash = '#list/' + currentListId + '/study/' + currentStudyMode;
            }
            break;
        case 'complete-view':
            if (currentListId) hash = '#list/' + currentListId + '/complete';
            break;
        case 'stats-view':
            hash = '#stats';
            break;
    }
    if (window.location.hash !== hash) {
        window.history.replaceState(null, '', hash || window.location.pathname + window.location.search);
    }
}

function parseHash() {
    const hash = window.location.hash;
    if (!hash || hash === '#') return { view: 'home' };
    // #list/<id>/study/<mode>
    const studyMatch = hash.match(/^#list\/([^\/]+)\/study\/(.+)$/);
    if (studyMatch) return { view: 'study', listId: studyMatch[1], mode: studyMatch[2] };
    // #list/<id>/complete
    const completeMatch = hash.match(/^#list\/([^\/]+)\/complete$/);
    if (completeMatch) return { view: 'complete', listId: completeMatch[1] };
    // #list/<id>
    const listMatch = hash.match(/^#list\/([^\/]+)$/);
    if (listMatch) return { view: 'list', listId: listMatch[1] };
    // #search
    if (hash === '#search') return { view: 'search' };
    // #stats
    if (hash === '#stats') return { view: 'stats' };
    // #create or #edit/<id>
    if (hash === '#create') return { view: 'create' };
    const editMatch = hash.match(/^#edit\/([^\/]+)$/);
    if (editMatch) return { view: 'edit', listId: editMatch[1] };
    return { view: 'home' };
}

function handleHashChange() {
    const route = parseHash();
    _hashNavigating = true;
    try {
        switch (route.view) {
            case 'home':
                showHome();
                break;
            case 'search':
                showSearchView();
                break;
            case 'stats':
                showStatsView();
                break;
            case 'create':
                showCreateList();
                break;
            case 'edit':
                if (route.listId) {
                    currentListId = route.listId;
                    editCurrentList();
                } else {
                    showCreateList();
                }
                break;
            case 'list':
                if (route.listId) {
                    const list = wordLists.find(l => l.id === route.listId);
                    if (list) {
                        showListDetail(route.listId);
                    } else {
                        showHome();
                    }
                } else {
                    showHome();
                }
                break;
            case 'study':
                // Study session restore: only show the list detail;
                // the actual session data is in localStorage activeStudySession
                if (route.listId) {
                    const list = wordLists.find(l => l.id === route.listId);
                    if (list) {
                        currentListId = route.listId;
                        currentStudyMode = route.mode;
                        // Try to restore active session
                        const raw = localStorage.getItem('activeStudySession');
                        if (raw) {
                            try {
                                const data = JSON.parse(raw);
                                if (data && data.listId === route.listId && data.mode === route.mode && data.state && data.state.words && data.state.words.length > 0) {
                                    studySession = data.state;
                                    restoreStudyView(route.mode);
                                    return;
                                }
                            } catch(e) { /* ignore */ }
                        }
                        // No active session to restore, show list detail instead
                        showListDetail(route.listId);
                    } else {
                        showHome();
                    }
                } else {
                    showHome();
                }
                break;
            case 'complete':
                // Can't restore a completion screen; show the list instead
                if (route.listId) {
                    const list = wordLists.find(l => l.id === route.listId);
                    if (list) {
                        showListDetail(route.listId);
                    } else {
                        showHome();
                    }
                } else {
                    showHome();
                }
                break;
            default:
                showHome();
        }
    } finally {
        _hashNavigating = false;
    }
}

function restoreStudyView(mode) {
    switch (mode) {
        case 'steps':
            showView('study-steps-view');
            updateStepsProgress();
            if (studySession.stepsReviewMode) {
                showNextStepsReviewQuestion();
            } else {
                showNextStepQuestion();
            }
            break;
        case 'typing':
            showView('study-typing-view');
            updateTypingProgress();
            if (studySession.typingReviewMode) {
                showNextTypingReviewQuestion();
            } else {
                showNextTypingQuestion();
            }
            break;
        case 'exam':
            showView('study-exam-view');
            updateExamProgress();
            showNextExamQuestion();
            break;
        case 'cards':
            // Cards can't easily be restored, show list
            if (currentListId) {
                showListDetail(currentListId);
            } else {
                showHome();
            }
            break;
    }
}

// ===== Progress Calculation =====
function calculateListProgress(list) {
    if (!list || !list.words || list.words.length === 0) {
        return { status: 'not_started', progressPct: 0, totalCorrect: 0, totalWrong: 0 };
    }
    const grouped = groupWordsByMastery(list.words);
    const total = list.words.length;
    const masteredCount = grouped.mastered.length;
    const learningCount = grouped.learning.length;
    const progressPct = Math.round((masteredCount / total) * 100);

    let totalCorrect = 0;
    let totalWrong = 0;
    list.words.forEach(w => {
        const s = w.stats || { correct: 0, wrong: 0 };
        totalCorrect += s.correct;
        totalWrong += s.wrong;
    });

    let status = 'not_started';
    if (masteredCount === total) {
        status = 'completed';
    } else if (learningCount > 0 || masteredCount > 0 || list.lastStudied) {
        status = 'in_progress';
    }

    return { status, progressPct, totalCorrect, totalWrong };
}

function syncProgressToRemote(listId) {
    if (!supabaseClient || !authUser || !isCloudEnabled()) return;
    saveListToRemote(listId).catch(err => {
        console.error('Progress sync failed:', err);
    });
}

function debouncedSyncProgress(listId) {
    if (_progressSyncTimer) clearTimeout(_progressSyncTimer);
    _progressSyncTimer = setTimeout(() => {
        _progressSyncTimer = null;
        syncProgressToRemote(listId);
    }, 3000);
}

// ===== Save Data =====
let _saveDataTimer = null;
function saveData() {
    ensureAllWordMetadata();
    try {
        localStorage.setItem('wordLists', JSON.stringify(wordLists));
    } catch (e) {
        if (e.name === 'QuotaExceededError' || e.code === 22) {
            console.error('localStorage quota exceeded:', e);
            showToast('Opslagruimte is vol! Verwijder oude lijsten om ruimte te maken.', 'error');
        } else {
            console.error('Failed to save data:', e);
        }
    }
}

function debouncedSaveData() {
    if (_saveDataTimer) clearTimeout(_saveDataTimer);
    _saveDataTimer = setTimeout(() => {
        _saveDataTimer = null;
        saveData();
    }, 1500);
}

function ensureWordMetadata(word) {
    if (!word) return;
    if (!word.stats) {
        word.stats = { correct: 0, wrong: 0 };
    }
}

function ensureAllWordMetadata() {
    wordLists.forEach(list => {
        (list.words || []).forEach(ensureWordMetadata);
    });
}

function normalizeForTypo(text) {
    return normalizeForSimilarity(text || '').replace(/\s+/g, ' ').trim();
}

function levenshteinForTypos(a, b) {
    const m = a.length;
    const n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost
            );
        }
    }

    return dp[m][n];
}

function isMinorTypoMatch(userAnswer, correctAnswer) {
    const user = normalizeForTypo(userAnswer);
    const correct = normalizeForTypo(correctAnswer);
    if (!user || !correct) return false;
    if (user === correct) return true;

    const distance = levenshteinForTypos(user, correct);
    const maxLen = Math.max(user.length, correct.length);
    const threshold = maxLen <= 7 ? 1 : 2;

    return distance <= threshold;
}

function isExamModeActive() {
    return currentStudyMode === 'exam';
}

function pushPendingAnswer(wordId, userAnswer, correctAnswer, isCorrect) {
    if (!isExamModeActive()) return;
    if (!studySession.pendingAnswers) studySession.pendingAnswers = [];
    studySession.pendingAnswers.push({
        wordId,
        userAnswer,
        correctAnswer,
        isCorrect
    });
}

function getHintLevel(wordId) {
    return studySession.hintUsageByWord?.[wordId] || 0;
}

function setHintLevel(wordId, level) {
    if (!studySession.hintUsageByWord) studySession.hintUsageByWord = {};
    studySession.hintUsageByWord[wordId] = Math.min(3, Math.max(level, 0));
}

function applyHintPenaltyIfNeeded(wordId, isCorrect) {
    if (!isCorrect) return;
    if (!studySession.hintsEnabled) return;
    if (getHintLevel(wordId) <= 0) return;
    if (!studySession.hintPenalizedWords) studySession.hintPenalizedWords = [];
    if (studySession.hintPenalizedWords.includes(wordId)) return;
    studySession.hintPenalty = (studySession.hintPenalty || 0) + 0.5;
    studySession.hintPenalizedWords.push(wordId);
}

function getEnabledLearnStages() {
    const allStages = [
        { id: 'learn-stage-flash', key: 'flash' },
        { id: 'learn-stage-copy', key: 'copy' },
        { id: 'learn-stage-choice', key: 'choice' },
        { id: 'learn-stage-hint', key: 'hint' },
        { id: 'learn-stage-typing', key: 'typing' }
    ];
    return allStages
        .filter(stage => document.getElementById(stage.id)?.checked)
        .map(stage => stage.key);
}

function buildHintPattern(answer) {
    return (answer || '')
        .split(/\s+/)
        .filter(Boolean)
        .map(part => {
            if (part.length <= 1) return part;
            return `${part[0]}${'.'.repeat(part.length - 1)}`;
        })
        .join(' ');
}

function normalizeQuoteMarks(text) {
    return (text || '')
        .replace(/[’‘`´]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/[ˆ]/g, '^');
}

function stripDiacriticsAndLooseMarks(text) {
    const normalized = normalizeQuoteMarks(text || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    return normalized.replace(/["'`^]/g, '');
}

// ===== Session Persistence =====
// restoreLastView is defined below near the DOMContentLoaded handler

// ===== Navigation =====
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    
    // Toggle body class for :has() fallback (older Firefox/Safari)
    const isStudyView = viewId.startsWith('study-');
    document.body.classList.toggle('study-active', isStudyView);
    
    const viewKey = viewId.replace('-view', '');
    
    // Update header nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === viewKey) {
            btn.classList.add('active');
        }
    });
    
    // Update mobile nav buttons
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === viewKey) {
            btn.classList.add('active');
        }
    });
    
    // Save view state for session persistence
    localStorage.setItem(LAST_VIEW_KEY, viewId);
    if (currentListId && (viewKey === 'list' || viewKey.startsWith('study-'))) {
        localStorage.setItem(LAST_LIST_ID_KEY, currentListId);
    }
    if (currentStudyMode && viewKey.startsWith('study-')) {
        localStorage.setItem(LAST_STUDY_MODE_KEY, currentStudyMode);
    }

    // Update URL hash for multi-tab support
    updateHash(viewId);
}

function showHome() {
    triggerHaptic('light');
    // Clear study state when going home
    currentListId = null;
    currentStudyMode = null;
    localStorage.removeItem(LAST_STUDY_MODE_KEY);
    
    showView('home-view');
    renderWordLists();
    document.querySelector('.nav-btn[data-view="home"]').classList.add('active');
    document.querySelector('.nav-btn[data-view="create"]').classList.remove('active');
    // BULK_IMPORT_FEATURE: restore undo banner if applicable
    checkBulkImportUndoState();
}

function showCreateList() {
    triggerHaptic('light');
    editingListId = null;
    document.getElementById('create-title').textContent = t('new_list_title');
    document.getElementById('list-title').value = '';
    const defaultLangFrom = getLanguage() === 'en' ? 'Engels' : '';
    document.getElementById('lang-from').value = defaultLangFrom;
    document.getElementById('lang-to').value = '';
    document.getElementById('selected-subject').value = '';
    document.getElementById('selected-icon').value = '';
    document.getElementById('import-area').classList.add('hidden');
    document.getElementById('import-text').value = '';
    setImportSource('plain');
    const publicToggle = document.getElementById('list-public');
    if (publicToggle) publicToggle.checked = isCloudEnabled();
    
    document.querySelectorAll('.subject-btn').forEach(btn => btn.classList.remove('active'));
    
    const wordsList = document.getElementById('words-list');
    wordsList.innerHTML = '';
    addWordEntry();
    addWordEntry();
    
    showView('create-view');
    document.querySelector('.nav-btn[data-view="create"]').classList.add('active');
    document.querySelector('.nav-btn[data-view="home"]').classList.remove('active');
}

function showListDetail(listId) {
    triggerHaptic('medium');
    currentListId = listId;
    const list = wordLists.find(l => l.id === listId);
    if (!list) return;
    
    // store id on container so buttons can still find it if state gets lost
    const container = document.querySelector('.list-detail-container');
    if (container) container.dataset.listId = listId;
    
    document.getElementById('list-detail-icon').className = `fas ${list.icon || 'fa-book'}`;
    document.getElementById('list-detail-title').textContent = list.title;
    document.getElementById('list-detail-meta').textContent = 
        `${list.words.length} woordjes • ${list.langFrom} → ${list.langTo}`;
    
    // Update direction labels
    document.getElementById('dir-term-def').textContent = `${list.langFrom} → ${list.langTo}`;
    document.getElementById('dir-def-term').textContent = `${list.langTo} → ${list.langFrom}`;
    
    renderWordsPreview(list.words);
    updateResumeBanner();
    showView('list-view');
}

// ===== Render Functions =====
function renderWordLists() {
    const container = document.getElementById('word-lists-container');
    const emptyState = document.getElementById('empty-state');

    renderHomeSubjectFilters();

    if (wordLists.length === 0) {
        container.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }

    container.classList.remove('hidden');
    emptyState.classList.add('hidden');

    // Sort word lists by last studied (newest first)
    let displayLists = [...wordLists].sort((a, b) => {
        const timeA = a.lastStudied || (a.createdAt ? new Date(a.createdAt).getTime() : 0);
        const timeB = b.lastStudied || (b.createdAt ? new Date(b.createdAt).getTime() : 0);
        return timeB - timeA;
    });

    if (homeSubjectFilter) {
        // If a subject is selected, show ALL lists from that subject
        displayLists = displayLists.filter(list => list.subject === homeSubjectFilter);
    } else {
        // If no filter, show top 10 most recent lists overall
        displayLists = displayLists.slice(0, 10);
    }

    if (displayLists.length === 0 && homeSubjectFilter) {
        container.innerHTML = `<div class="empty-state" style="grid-column: 1/-1; padding: 2rem;">
            <i class="fas fa-folder-open"></i>
            <h3>Geen lijsten gevonden voor dit vak</h3>
        </div>`;
        updateMergeButton();
        return;
    }

    container.innerHTML = displayLists.map(list => {
        const isSelected = selectedListsForMerge.includes(list.id);
        const checkboxHtml = mergeMode ? `
            <div class="merge-checkbox" onclick="event.stopPropagation(); toggleListSelection('${list.id}')">
                <i class="fas ${isSelected ? 'fa-check-square' : 'fa-square'}"></i>
            </div>
        ` : '';

        const progress = calculateListProgress(list);
        const progressBarHtml = progress.status !== 'not_started' ? `
            <div class="card-progress">
                <div class="card-progress-bar">
                    <div class="card-progress-fill" style="width: ${progress.progressPct}%"></div>
                </div>
                <span class="card-progress-text">${t('pct_learned', {pct: progress.progressPct})}</span>
            </div>
        ` : '';

        return `
        <div class="word-list-card ${isSelected ? 'selected' : ''}" onclick="${mergeMode ? `toggleListSelection('${list.id}')` : `showListDetail('${list.id}')`}">
            ${checkboxHtml}
            <div class="card-header">
                <div class="card-icon">
                    <i class="fas ${list.icon || 'fa-book'}"></i>
                </div>
                <div>
                    <div class="card-title">${escapeHtml(list.title)}</div>
                <div class="card-meta">${t('words_count', {count: list.words.length, s: list.words.length !== 1 ? 's' : ''})}${isCloudEnabled() && list.isPublic ? ' \u2022 ' + t('public_badge') : ''}</div>
                </div>
            </div>
            <div class="card-languages">
                <span>${escapeHtml(list.langFrom)}</span>
                <i class="fas fa-arrow-right"></i>
                <span>${escapeHtml(list.langTo)}</span>
            </div>
            ${progressBarHtml}
        </div>
    `;
    }).join('');

    updateMergeButton();
}

function renderHomeSubjectFilters() {
    const filtersBar = document.getElementById('home-subject-filters');
    if (!filtersBar) return;

    if (visibleHomeSubjects.length === 0) {
        filtersBar.innerHTML = '';
        return;
    }

    const mapSubjectKey = {
        'duits': 'subj_de', 'frans': 'subj_fr', 'engels': 'subj_en',
        'nederlands': 'subj_nl', 'spaans': 'subj_es', 'italiaans': 'subj_it',
        'latijn': 'subj_la', 'grieks': 'subj_gr', 'natuurkunde': 'subj_nat',
        'scheikunde': 'subj_chem', 'biologie': 'subj_bio', 'other': 'subj_other'
    };

    filtersBar.innerHTML = visibleHomeSubjects.map(subKey => {
        const i18nCode = mapSubjectKey[subKey];
        const flag = subjectFlagsMap[subKey] || '<i class="fas fa-book"></i>';
        const isActive = homeSubjectFilter === subKey;
        
        return `<button class="btn ${isActive ? 'btn-primary' : 'btn-secondary'}" 
                        style="border-radius: 50px; padding: 0.4rem 1rem; margin-right: 0.5rem; margin-bottom: 0.5rem;"
                        onclick="toggleHomeSubjectFilter('${subKey}')">
                    <span style="margin-right: 4px;">${flag}</span> ${i18nCode ? t(i18nCode) : subKey}
                </button>`;
    }).join('');
}

function toggleHomeSubjectFilter(subject) {
    if (homeSubjectFilter === subject) {
        homeSubjectFilter = null; // deselect
    } else {
        homeSubjectFilter = subject; // select
    }
    renderWordLists();
}

function renderWordsPreview(words) {
    const container = document.getElementById('words-preview-list');
    const grouped = groupWordsByMastery(words);
    const groupOrder = [
        { key: 'new', title: t('group_new') },
        { key: 'learning', title: t('group_learning') },
        { key: 'mastered', title: t('group_mastered') }
    ];

    container.innerHTML = groupOrder.map(group => {
        const groupWords = grouped[group.key] || [];
        if (groupWords.length === 0) return '';
        return `
        <div class="word-group" data-group="${group.key}">
            <div class="word-group-header">
                <h4>${group.title} (${groupWords.length})</h4>
                <button class="btn btn-secondary btn-select-group" onclick="toggleSelectGroup('${group.key}')">
                    <i class="fas fa-check"></i> ${t('select_group_btn')}
                </button>
            </div>
            <div class="word-group-list">
                ${groupWords.map(word => {
                    const stats = word.stats || { correct: 0, wrong: 0 };
                    return `
                    <div class="preview-word-item" data-word-id="${word.id}" data-group="${group.key}">
                        <label class="preview-select">
                            <input type="checkbox" class="word-select" value="${word.id}">
                            <span class="checkmark"></span>
                        </label>
                        <span class="term">${escapeHtml(word.term)}</span>
                        <span class="definition">${escapeHtml(word.definition)}</span>
                        <span class="word-stats">
                            <span class="stat-good">${t('stat_correct_label', {count: stats.correct})}</span>
                            <span class="stat-bad">${t('stat_wrong_label', {count: stats.wrong})}</span>
                        </span>
                    </div>
                    `;
                }).join('')}
            </div>
        </div>
        `;
    }).join('');

    document.querySelectorAll('.word-select').forEach(cb => {
        cb.addEventListener('change', updateSelectAllButton);
    });

    updateSelectAllButton();
}

function groupWordsByMastery(words) {
    const grouped = { new: [], learning: [], mastered: [] };
    words.forEach(word => {
        const stats = word.stats || { correct: 0, wrong: 0 };
        const total = stats.correct + stats.wrong;
        if (total === 0) {
            grouped.new.push(word);
            return;
        }

        const accuracy = stats.correct / total;
        if (stats.correct >= 5 && accuracy >= 0.8) {
            grouped.mastered.push(word);
            return;
        }

        grouped.learning.push(word);
    });
    return grouped;
}

function getSelectedWordIdsForStudy() {
    return Array.from(document.querySelectorAll('.word-select:checked')).map(cb => cb.value);
}

function getStudyWordsFromSelection(words) {
    const selectedIds = studySession.selectedWordIds || [];
    return !selectedIds.length ? [...words] : words.filter(w => selectedIds.includes(w.id));
}

function getHardestWordIds(words, limit = 10) {
    return [...words]
        .map(word => {
            ensureWordMetadata(word);
            const stats = word.stats || { correct: 0, wrong: 0 };
            const score = (stats.wrong * 2) - stats.correct;
            return { id: word.id, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, Math.max(1, limit))
        .map(x => x.id);
}

function startEmergencyCram() {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list || !list.words || list.words.length === 0) return;

    const hardestWordIds = getHardestWordIds(list.words, Math.min(10, list.words.length));
    startStudyMode('typing', {
        emergencyMode: true,
        emergencyWordIds: hardestWordIds
    });
}

function toggleSelectAllWords() {
    const checkboxes = Array.from(document.querySelectorAll('.word-select'));
    if (checkboxes.length === 0) return;

    const allChecked = checkboxes.every(cb => cb.checked);
    checkboxes.forEach(cb => {
        cb.checked = !allChecked;
    });

    updateSelectAllButton();
}

function toggleSelectGroup(groupKey) {
    const checkboxes = Array.from(document.querySelectorAll(`.preview-word-item[data-group="${groupKey}"] .word-select`));
    if (checkboxes.length === 0) return;

    const allChecked = checkboxes.every(cb => cb.checked);
    checkboxes.forEach(cb => {
        cb.checked = !allChecked;
    });

    updateSelectAllButton();
}

function updateSelectAllButton() {
    const btn = document.querySelector('.btn-select-all');
    if (!btn) return;

    const checkboxes = Array.from(document.querySelectorAll('.word-select'));
    if (checkboxes.length === 0) return;

    const allChecked = checkboxes.every(cb => cb.checked);
    btn.innerHTML = allChecked
        ? `<i class="fas fa-times"></i> ${t('deselect_all_btn')}`
        : `<i class="fas fa-check-double"></i> ${t('select_all_btn')}`;
}

// ===== Word Entry Management =====
function addWordEntry(term = '', definition = '', wordId = '') {
    const wordsList = document.getElementById('words-list');
    const entryNum = wordsList.children.length + 1;
    
    const entry = document.createElement('div');
    entry.className = 'word-entry';
    if (wordId) {
        entry.dataset.wordId = wordId;
    }
    entry.innerHTML = `
        <span class="entry-number">${entryNum}</span>
        <input type="text" class="word-term" placeholder="${t('word_placeholder')}" value="${escapeHtml(term)}" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false">
        <input type="text" class="word-definition" placeholder="${t('definition_placeholder')}" value="${escapeHtml(definition)}" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false">
        <button class="btn-remove" onclick="removeWordEntry(this)" title="${t('remove_word_title')}">
            <i class="fas fa-times"></i>
        </button>
    `;
    wordsList.appendChild(entry);
    
    // Auto-add new entry when typing in last field
    const defInput = entry.querySelector('.word-definition');
    defInput.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && !e.shiftKey) {
            const entries = document.querySelectorAll('.word-entry');
            if (entry === entries[entries.length - 1]) {
                e.preventDefault();
                addWordEntry();
                setTimeout(() => {
                    const newEntry = document.querySelector('.word-entry:last-child .word-term');
                    newEntry.focus();
                }, 50);
            }
        }
    });
}

function removeWordEntry(btn) {
    const entry = btn.closest('.word-entry');
    entry.remove();
    updateEntryNumbers();
}

function updateEntryNumbers() {
    document.querySelectorAll('.word-entry').forEach((entry, index) => {
        entry.querySelector('.entry-number').textContent = index + 1;
    });
}

// ===== Subject Selection =====
document.querySelectorAll('.subject-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('selected-subject').value = btn.dataset.subject;
        document.getElementById('selected-icon').value = btn.dataset.icon;

        const fromSearch = document.getElementById('lang-from-search');
        const toSearch = document.getElementById('lang-to-search');
        const langFromSelect = document.getElementById('lang-from');
        const langToSelect = document.getElementById('lang-to');
        if (langFromSelect) filterLanguageSelect(fromSearch?.value || '', langFromSelect);
        if (langToSelect) filterLanguageSelect(toSearch?.value || '', langToSelect);
    });
});

// ===== Import =====
let importSource = 'plain';

function setImportSource(source) {
    importSource = source;
    document.querySelectorAll('.import-source-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.source === source);
    });
    document.getElementById('import-instructions-plain').classList.toggle('hidden', source !== 'plain');
    document.getElementById('import-instructions-studygo').classList.toggle('hidden', source !== 'studygo');
    document.getElementById('import-instructions-jojoschool').classList.toggle('hidden', source !== 'jojoschool');

    const textarea = document.getElementById('import-text');
    if (source === 'studygo') {
        textarea.placeholder = 'Plak hier de gekopieerde StudyGo pagina...';
    } else if (source === 'jojoschool') {
        textarea.placeholder = 'Plak hier de gekopieerde JoJoSchool pagina...';
    } else {
        textarea.placeholder = 'woord1\tvertaling1\nwoord2\tvertaling2';
    }
}

function toggleImport() {
    document.getElementById('import-area').classList.toggle('hidden');
}

function detectSingleLanguage(text) {
    const languages = {
        'engels': 'Engels', 'english': 'Engels',
        'frans': 'Frans', 'french': 'Frans', 'français': 'Frans',
        'grieks': 'Grieks', 'greek': 'Grieks',
        'latijn': 'Latijn', 'latin': 'Latijn',
        'duits': 'Duits', 'german': 'Duits', 'deutsch': 'Duits',
        'spaans': 'Spaans', 'spanish': 'Spaans', 'español': 'Spaans',
        'italiaans': 'Italiaans', 'italian': 'Italiaans', 'italiano': 'Italiaans',
        'portugees': 'Portugees', 'portuguese': 'Portugees',
        'russisch': 'Russisch', 'russian': 'Russisch',
        'nederlands': 'Nederlands', 'dutch': 'Nederlands',
        'zweeds': 'Zweeds', 'swedish': 'Zweeds',
        'noors': 'Noors', 'norwegian': 'Noors',
        'deens': 'Deens', 'danish': 'Deens',
        'fins': 'Fins', 'finnish': 'Fins',
        'pools': 'Pools', 'polish': 'Pools',
        'tsjechisch': 'Tsjechisch', 'czech': 'Tsjechisch',
        'turks': 'Turks', 'turkish': 'Turks',
        'arabisch': 'Arabisch', 'arabic': 'Arabisch',
        'chinees': 'Chinees', 'chinese': 'Chinees',
        'japans': 'Japans', 'japanese': 'Japans',
        'koreaans': 'Koreaans', 'korean': 'Koreaans'
    };
    return languages[text.toLowerCase()] || null;
}

function parseStudyGoText(text) {
    const lines = text.split('\n').filter(line => line.trim());
    const skipHeaders = [
        'home', 'oefenen', 'forum', 'lessen', 'zoeken',
        'terug naar lijst', 'lijst printen', 'tabel', 'kaartjes'
    ];

    let title = '';
    let fromLang = '';
    let toLang = '';
    let wordStartIndex = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const lower = line.toLowerCase();

        if (skipHeaders.includes(lower)) continue;

        // Check for chapter title
        if (/hoofdstuk|chapter|^\d|^[a-z]\./i.test(line)) {
            if (!title) {
                title = line;
            }
            continue;
        }

        // Check for language name
        const detectedLang = detectSingleLanguage(line);
        if (detectedLang) {
            fromLang = detectedLang;
            if (i + 1 < lines.length) {
                const secondLang = detectSingleLanguage(lines[i + 1].trim());
                if (secondLang) {
                    toLang = secondLang;
                    wordStartIndex = i + 2;
                    break;
                }
            }
        }
    }

    const pairs = [];
    for (let i = wordStartIndex; i < lines.length - 1; i += 2) {
        const word = lines[i].trim();
        const translation = lines[i + 1].trim();

        if (!word || !translation) continue;
        if (skipHeaders.includes(word.toLowerCase())) continue;
        if (skipHeaders.includes(translation.toLowerCase())) continue;

        pairs.push({ term: word, definition: translation });
    }

    return { title, fromLang, toLang, pairs };
}

function parseJojoSchoolText(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);

    // Headers to filter out - more comprehensive list
    const skipPatterns = [
        /^nieuw$/i, /^woordenlijst$/i, /^stel je vraag$/i,
        /^mijn account$/i, /^blogs$/i, /^log uit$/i, /^upgrade$/i,
        /^start met oefenen$/i, /^stampen$/i, /^toets$/i, /^flashcard$/i,
        /^meerkeuze$/i, /^typen$/i, /^opslaan$/i, /^maak kopie$/i, /^delen$/i,
        /^verwijder$/i, /^bewerk$/i, /^ken je nog niet$/i, /^aan het leren$/i,
        /^gestampt!$/i, /^selecteer deze$/i, /^woorden in deze lijst/i,
        /^je bent/i, /^voortgang$/i, /^bekijk je voortgang/i, /^oefen opnieuw$/i,
        /^keer geoefend$/i, /^geen beoordelingen$/i, /^je bent goed op weg/i,
        /^ga verder waar je gebleven was/i, /^hervat sessie$/i, /^selecteer alle$/i,
        /^\d+,\d+$/i, /^topscore!/i, /^nog niet geoefend/i  // Scores and ratings
    ];

    let title = '';
    let fromLang = '';
    let wordLines = [];
    let seenFirstTitle = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Skip patterns
        if (skipPatterns.some(p => p.test(line))) continue;

        // Try to detect language early
        if (!fromLang && wordLines.length === 0) {
            const lang = detectSingleLanguage(line);
            if (lang) {
                fromLang = lang;
                continue;
            }
        }

        // Detect title (first substantial non-numeric line)
        if (!title && !seenFirstTitle && line.length > 3 && line.length < 150) {
            // Should not be just numbers, shouldn't look like a score
            if (!/^\d+$/.test(line) && !line.match(/^\d+[,.]\d+$/)) {
                title = line;
                seenFirstTitle = true;
                continue;
            }
        }

        // Only add to word lines after title is detected
        if (seenFirstTitle && line.length > 0) {
            wordLines.push(line);
        }
    }

    // Pair up consecutive lines - more robust
    const pairs = [];
    let i = 0;
    while (i < wordLines.length) {
        const word = wordLines[i];
        const translation = i + 1 < wordLines.length ? wordLines[i + 1] : null;

        // A valid pair needs both word and translation
        if (translation && word.length > 0 && translation.length > 0) {
            pairs.push({ term: word, definition: translation });
            i += 2;
        } else {
            // Skip unpaired lines
            i += 1;
        }
    }

    return { title, fromLang, toLang: 'Nederlands', pairs };
}

function importWords() {
    const text = document.getElementById('import-text').value;

    if (importSource === 'studygo') {
        const result = parseStudyGoText(text);

        if (result.pairs.length === 0) {
            alert('Geen woordparen gevonden. Controleer of je de juiste tekst hebt geplakt.');
            return;
        }

        // Auto-fill title if empty
        const titleInput = document.getElementById('list-title');
        if (!titleInput.value.trim() && result.title) {
            titleInput.value = result.title;
        }

        // Auto-fill languages if not set
        const langFrom = document.getElementById('lang-from');
        const langTo = document.getElementById('lang-to');
        if (!langFrom.value && result.fromLang) {
            langFrom.value = result.fromLang;
        }
        if (!langTo.value && result.toLang) {
            langTo.value = result.toLang;
        }

        // Clear empty entries
        const wordsList = document.getElementById('words-list');
        const existingEntries = Array.from(wordsList.querySelectorAll('.word-entry'));
        const allEmpty = existingEntries.length > 0 && existingEntries.every(entry => {
            const term = entry.querySelector('.word-term').value.trim();
            const def = entry.querySelector('.word-definition').value.trim();
            return !term && !def;
        });
        if (allEmpty) {
            wordsList.innerHTML = '';
        }

        result.pairs.forEach(pair => {
            addWordEntry(pair.term, pair.definition);
        });
    } else if (importSource === 'jojoschool') {
        const result = parseJojoSchoolText(text);

        if (result.pairs.length === 0) {
            alert('Geen woordparen gevonden. Controleer of je de juiste tekst hebt geplakt.');
            return;
        }

        // Auto-fill title if empty
        const titleInput = document.getElementById('list-title');
        if (!titleInput.value.trim() && result.title) {
            titleInput.value = result.title;
        }

        // Auto-fill languages if not set
        const langFrom = document.getElementById('lang-from');
        const langTo = document.getElementById('lang-to');
        if (!langFrom.value && result.fromLang) {
            langFrom.value = result.fromLang;
        }
        if (!langTo.value && result.toLang) {
            langTo.value = result.toLang;
        }

        // Clear empty entries
        const wordsList = document.getElementById('words-list');
        const existingEntries = Array.from(wordsList.querySelectorAll('.word-entry'));
        const allEmpty = existingEntries.length > 0 && existingEntries.every(entry => {
            const term = entry.querySelector('.word-term').value.trim();
            const def = entry.querySelector('.word-definition').value.trim();
            return !term && !def;
        });
        if (allEmpty) {
            wordsList.innerHTML = '';
        }

        result.pairs.forEach(pair => {
            addWordEntry(pair.term, pair.definition);
        });
    } else {
        const lines = text.trim().split('\n');

        const wordsList = document.getElementById('words-list');
        const existingEntries = Array.from(wordsList.querySelectorAll('.word-entry'));
        const allEmpty = existingEntries.length > 0 && existingEntries.every(entry => {
            const term = entry.querySelector('.word-term').value.trim();
            const def = entry.querySelector('.word-definition').value.trim();
            return !term && !def;
        });
        if (allEmpty) {
            wordsList.innerHTML = '';
        }

        lines.forEach(line => {
            const parts = line.split('\t');
            if (parts.length >= 2) {
                addWordEntry(parts[0].trim(), parts[1].trim());
            }
        });
    }

    document.getElementById('import-text').value = '';
    document.getElementById('import-area').classList.add('hidden');
}

// ===== Bulk Import =====
// BULK_IMPORT_FEATURE: Remove this entire section (until END marker) to disable bulk import

const BULK_IMPORT_LAST_IDS_KEY = 'lastBulkImportIds';

const BULK_IMPORT_FORMAT_EXAMPLE = `[
  {
    "title": "Lijst 1",
    "langFrom": "Engels",
    "langTo": "Nederlands",
    "subject": "engels",
    "words": [
      {"term": "hello", "definition": "hallo"},
      {"term": "world", "definition": "wereld"}
    ]
  },
  {
    "title": "Lijst 2",
    "langFrom": "Frans",
    "langTo": "Nederlands",
    "subject": "frans",
    "words": [
      {"term": "bonjour", "definition": "goedendag"},
      {"term": "merci", "definition": "dankjewel"}
    ]
  }
]`;

function openBulkImportModal() {
    document.getElementById('bulk-import-modal').classList.remove('hidden');
    document.getElementById('bulk-import-text').value = '';
    document.getElementById('bulk-import-progress').classList.add('hidden');
    document.getElementById('bulk-import-submit-btn').disabled = false;
    document.getElementById('bulk-import-progress-fill').style.width = '0%';
    document.getElementById('bulk-import-status').textContent = t('bulk_importing');
}

function closeBulkImportModal() {
    document.getElementById('bulk-import-modal').classList.add('hidden');
}

function copyBulkImportFormat() {
    navigator.clipboard.writeText(BULK_IMPORT_FORMAT_EXAMPLE).then(() => {
        const btn = document.querySelector('.btn-copy-format');
        if (!btn) return;
        btn.innerHTML = '<i class="fas fa-check"></i> Gekopieerd!';
        setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i> Kopieer voorbeeld'; }, 2000);
    }).catch(() => {
        // Fallback: select text in pre
        const pre = document.querySelector('.bulk-import-pre');
        if (pre) {
            const range = document.createRange();
            range.selectNode(pre);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    });
}

async function executeBulkImport() {
    const text = document.getElementById('bulk-import-text').value.trim();
    if (!text) {
        alert(t('bulk_enter_json'));
        return;
    }

    let lists;
    try {
        lists = JSON.parse(text);
    } catch (e) {
        alert(t('bulk_invalid_json', {msg: e.message}));
        return;
    }

    if (!Array.isArray(lists) || lists.length === 0) {
        alert(t('bulk_not_array'));
        return;
    }

    // Validate all lists before starting
    for (let i = 0; i < lists.length; i++) {
        const l = lists[i];
        if (!l.title || typeof l.title !== 'string') {
            alert(t('bulk_missing_title', {num: i + 1}));
            return;
        }
        if (!l.langFrom || !l.langTo) {
            alert(t('bulk_missing_langs', {title: l.title}));
            return;
        }
        if (!Array.isArray(l.words) || l.words.length === 0) {
            alert(t('bulk_missing_words', {title: l.title}));
            return;
        }
        for (let j = 0; j < l.words.length; j++) {
            const w = l.words[j];
            if (!w.term || !w.definition) {
                alert(t('bulk_missing_word_fields', {title: l.title, num: j + 1}));
                return;
            }
        }
    }

    // Show progress UI
    const progressEl = document.getElementById('bulk-import-progress');
    const progressFill = document.getElementById('bulk-import-progress-fill');
    const statusText = document.getElementById('bulk-import-status');
    const submitBtn = document.getElementById('bulk-import-submit-btn');
    progressEl.classList.remove('hidden');
    submitBtn.disabled = true;

    const importedIds = [];
    const total = lists.length;
    let cloudFailed = 0;

    for (let i = 0; i < total; i++) {
        const l = lists[i];
        statusText.textContent = t('bulk_progress_creating', {num: i + 1, total, title: l.title});
        progressFill.style.width = `${Math.round((i / total) * 100)}%`;

        const newList = {
            id: generateId(),
            title: l.title,
            langFrom: l.langFrom,
            langTo: l.langTo,
            subject: l.subject || 'overig',
            icon: l.icon || 'fa-book',
            isPublic: l.isPublic !== false,
            createdAt: new Date().toISOString(),
            words: l.words.map(w => ({
                id: generateId(),
                term: String(w.term),
                definition: String(w.definition),
                stats: { correct: 0, wrong: 0 }
            }))
        };

        wordLists.push(newList);
        importedIds.push(newList.id);

        if (authUser && supabaseClient) {
            try {
                statusText.textContent = t('bulk_progress_saving', {num: i + 1, total, title: l.title});
                await saveListToRemote(newList.id);
            } catch (err) {
                console.error(`Cloud opslaan mislukt voor "${l.title}":`, err);
                cloudFailed++;
            }
        }
    }

    progressFill.style.width = '100%';
    const cloudMsg = (authUser && supabaseClient && cloudFailed === 0)
        ? t('bulk_cloud_saved')
        : (cloudFailed > 0 ? t('bulk_cloud_error', {count: cloudFailed, s: cloudFailed !== 1 ? 's' : ''}) : '');
    statusText.textContent = t('bulk_done', {count: total, s: total !== 1 ? 's' : '', extra: cloudMsg});

    // Always save locally as well
    saveData();

    // Store imported IDs for undo functionality
    localStorage.setItem(BULK_IMPORT_LAST_IDS_KEY, JSON.stringify(importedIds));

    setTimeout(() => {
        closeBulkImportModal();
        renderWordLists();
        showBulkImportUndoBanner(total);
        triggerHaptic('success');
    }, 900);
}

function showBulkImportUndoBanner(count) {
    const banner = document.getElementById('bulk-import-undo-banner');
    const text = document.getElementById('bulk-import-undo-text');
    if (!banner || !text) return;
    text.textContent = t('bulk_undo_banner', {count, s: count !== 1 ? 's' : ''});
    banner.classList.remove('hidden');
}

function dismissBulkImportBanner() {
    const banner = document.getElementById('bulk-import-undo-banner');
    if (banner) banner.classList.add('hidden');
}

async function undoLastBulkImport() {
    const ids = JSON.parse(localStorage.getItem(BULK_IMPORT_LAST_IDS_KEY) || '[]');
    if (ids.length === 0) {
        alert(t('bulk_undo_alert'));
        return;
    }

    if (!confirm(t('bulk_undo_confirm', {count: ids.length, s: ids.length !== 1 ? 's' : ''}))) return;

    for (const id of ids) {
        wordLists = wordLists.filter(l => l.id !== id);
        if (authUser && supabaseClient) {
            try {
                await deleteListFromRemote(id);
            } catch (err) {
                console.error(`Verwijderen uit cloud mislukt voor ${id}:`, err);
            }
        }
    }

    localStorage.removeItem(BULK_IMPORT_LAST_IDS_KEY);
    saveData();
    dismissBulkImportBanner();
    renderWordLists();
    triggerHaptic('success');
}

// Called on showHome() to restore undo banner if a recent bulk import exists
function checkBulkImportUndoState() {
    const ids = JSON.parse(localStorage.getItem(BULK_IMPORT_LAST_IDS_KEY) || '[]');
    if (ids.length > 0) {
        showBulkImportUndoBanner(ids.length);
    } else {
        dismissBulkImportBanner();
    }
}

// END BULK_IMPORT_FEATURE

// ===== Save List =====
async function saveList() {
    triggerHaptic('light');
    const title = document.getElementById('list-title').value.trim();
    const langFrom = document.getElementById('lang-from').value.trim();
    const langTo = document.getElementById('lang-to').value.trim();
    const subject = document.getElementById('selected-subject').value;
    const icon = document.getElementById('selected-icon').value || 'fa-book';
    const isPublic = isCloudEnabled() ? (document.getElementById('list-public')?.checked !== false) : false;
    const existingList = editingListId ? wordLists.find(l => l.id === editingListId) : null;
    const statsById = (existingList?.words || []).reduce((acc, w) => {
        acc[w.id] = w.stats || { correct: 0, wrong: 0 };
        return acc;
    }, {});
    
    if (!title) {
        alert('Voer een titel in voor je woordenlijst');
        return;
    }

    if (!langFrom || !langTo) {
        alert('Kies beide talen voor je woordenlijst');
        return;
    }
    
    const words = [];
    document.querySelectorAll('.word-entry').forEach(entry => {
        const term = entry.querySelector('.word-term').value.trim();
        const definition = entry.querySelector('.word-definition').value.trim();
        if (term && definition) {
            const existingId = entry.dataset.wordId;
            const wordId = existingId || generateId();
            words.push({
                id: wordId,
                term,
                definition,
                stats: statsById[wordId] || { correct: 0, wrong: 0 }
            });
        }
    });
    
    if (words.length === 0) {
        alert('Voeg minimaal één woord toe');
        return;
    }
    
    if (editingListId) {
        const listIndex = wordLists.findIndex(l => l.id === editingListId);
        if (listIndex >= 0) {
            wordLists[listIndex] = {
                ...wordLists[listIndex],
                title,
                langFrom,
                langTo,
                subject,
                icon,
                words,
                isPublic
            };
        }
    } else {
        const newList = {
            id: generateId(),
            title,
            langFrom,
            langTo,
            subject,
            icon,
            words,
            isPublic,
            createdAt: new Date().toISOString()
        };
        wordLists.push(newList);
    }

    if (authUser && supabaseClient) {
        try {
            await saveListToRemote(editingListId || wordLists[wordLists.length - 1].id);
            await loadRemoteLists();
        } catch (err) {
            console.error('Online opslaan mislukt, lokaal opgeslagen.', err);
            saveData();
            alert('Online opslaan mislukt. Je lijst is wel lokaal opgeslagen. Controleer je RLS policies.');
        }
    } else {
        saveData();
    }

    showHome();
}

// ===== Edit/Delete List =====
function editCurrentList() {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;
    
    editingListId = list.id;
    document.getElementById('create-title').textContent = t('edit_list_heading');
    document.getElementById('list-title').value = list.title;
    document.getElementById('lang-from').value = list.langFrom || '';
    document.getElementById('lang-to').value = list.langTo || '';
    document.getElementById('selected-subject').value = list.subject;
    document.getElementById('selected-icon').value = list.icon;
    
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.subject === list.subject);
    });
    
    const wordsList = document.getElementById('words-list');
    wordsList.innerHTML = '';
    list.words.forEach(word => addWordEntry(word.term, word.definition, word.id));

    const publicToggle = document.getElementById('list-public');
    if (publicToggle) publicToggle.checked = isCloudEnabled() ? !!list.isPublic : false;

    const fromSearch = document.getElementById('lang-from-search');
    const toSearch = document.getElementById('lang-to-search');
    const langFromSelect = document.getElementById('lang-from');
    const langToSelect = document.getElementById('lang-to');
    if (langFromSelect) filterLanguageSelect(fromSearch?.value || '', langFromSelect);
    if (langToSelect) filterLanguageSelect(toSearch?.value || '', langToSelect);
    
    triggerHaptic('medium');
    showView('create-view');
}

async function deleteCurrentList() {
    triggerHaptic('heavy');
    // allow fallback to dataset on container if currentListId was lost
    const container = document.querySelector('.list-detail-container');
    const id = currentListId || (container && container.dataset.listId);

    if (!id) {
        alert('Geen woordenlijst geselecteerd om te verwijderen.');
        return;
    }

    if (!confirm('Weet je zeker dat je deze woordenlijst wilt verwijderen?')) return;

    // show immediate UI feedback by disabling delete button
    const deleteBtn = document.querySelector('.btn-danger');
    if (deleteBtn) deleteBtn.disabled = true;

    const beforeCount = wordLists.length;
    wordLists = wordLists.filter(l => l.id !== id);

    if (wordLists.length === beforeCount) {
        // nothing removed — restore button and warn
        if (deleteBtn) deleteBtn.disabled = false;
        alert('Woordlijst niet gevonden of al verwijderd.');
        return;
    }

    if (authUser && supabaseClient) {
        await deleteListFromRemote(id);
        await loadRemoteLists();
    } else {
        saveData();
    }
    // clear any stored active session for this list
    const active = JSON.parse(localStorage.getItem('activeStudySession') || '{}');
    if (active && active.listId === id) localStorage.removeItem('activeStudySession');

    showHome();
}

// ===== Merge Functions =====
function toggleMergeMode() {
    mergeMode = !mergeMode;
    selectedListsForMerge = [];
    renderWordLists();

    const mergeBtn = document.getElementById('merge-mode-btn');
    const mergeActionBtn = document.getElementById('merge-action-btn');

    if (mergeBtn) {
        if (mergeMode) {
            mergeBtn.innerHTML = '<i class="fas fa-times"></i> Annuleren';
            mergeBtn.classList.add('active');
        } else {
            mergeBtn.innerHTML = '<i class="fas fa-layer-group"></i> Samenvoegen';
            mergeBtn.classList.remove('active');
        }
    }

    if (mergeActionBtn) {
        mergeActionBtn.classList.add('hidden');
    }
}

function toggleListSelection(listId) {
    if (!mergeMode) return;

    const index = selectedListsForMerge.indexOf(listId);
    if (index > -1) {
        selectedListsForMerge.splice(index, 1);
    } else {
        selectedListsForMerge.push(listId);
    }

    renderWordLists();
}

function updateMergeButton() {
    const mergeActionBtn = document.getElementById('merge-action-btn');
    if (!mergeActionBtn) return;

    if (mergeMode && selectedListsForMerge.length >= 2) {
        mergeActionBtn.classList.remove('hidden');
        mergeActionBtn.textContent = t('merge_count_btn', {count: selectedListsForMerge.length, s: selectedListsForMerge.length !== 1 ? 's' : ''});
    } else {
        mergeActionBtn.classList.add('hidden');
    }
}

function mergeLists() {
    if (selectedListsForMerge.length < 2) {
        alert('Selecteer minstens 2 woordenlijsten om samen te voegen.');
        return;
    }

    const selectedLists = wordLists.filter(l => selectedListsForMerge.includes(l.id));

    // Verzamel alle woorden en verwijder duplicaten
    const allWords = [];
    const seenTerms = new Set();

    selectedLists.forEach(list => {
        list.words.forEach(word => {
            const key = `${word.term.toLowerCase()}-${word.definition.toLowerCase()}`;
            if (!seenTerms.has(key)) {
                seenTerms.add(key);
                allWords.push({
                    id: word.id || generateId(),
                    term: word.term,
                    definition: word.definition,
                    stats: word.stats || { correct: 0, wrong: 0 }
                });
            }
        });
    });

    // Bepaal gedeelde eigenschappen
    const firstList = selectedLists[0];
    const allSameLang = selectedLists.every(l =>
        l.langFrom === firstList.langFrom &&
        l.langTo === firstList.langTo
    );
    const allSameSubject = selectedLists.every(l => l.subject === firstList.subject);

    // Vul het create-view formulier in
    document.getElementById('list-title').value = selectedLists.map(l => l.title).join(' + ');
    document.getElementById('selected-subject').value = allSameSubject ? firstList.subject : '';
    document.getElementById('selected-icon').value = allSameSubject ? firstList.icon : 'fa-book';

    // Update subject button selection
    document.querySelectorAll('.subject-btn').forEach(btn => {
        if (allSameSubject && btn.dataset.subject === firstList.subject) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Vul taalkeuzes in
    if (allSameLang) {
        document.getElementById('lang-from').value = firstList.langFrom;
        document.getElementById('lang-to').value = firstList.langTo;
    } else {
        document.getElementById('lang-from').value = '';
        document.getElementById('lang-to').value = '';
    }

    // Verwijder oude woorden en voeg nieuwe toe
    document.getElementById('words-list').innerHTML = '';
    allWords.forEach(word => {
        addWordEntry(word.term, word.definition, word.id);
    });

    // Reset merge mode en ga naar create view
    mergeMode = false;
    selectedListsForMerge = [];
    editingListId = null;

    showCreateList();
}

async function exportCurrentList() {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;

    const header = t('export_header', {title: list.title, from: list.langFrom, to: list.langTo});
    const content = list.words.map(w => `${w.term}\t${w.definition}`).join('\n');
    const text = header + content;

    try {
        await navigator.clipboard.writeText(text);
        alert('Woordlijst gekopieerd naar je klembord.');
    } catch (err) {
        console.error('Kopiëren mislukt', err);
        alert('Kopiëren naar klembord is mislukt. Probeer het in een veilige (https) omgeving.');
    }
}

// Bouw een korte share-URL via Supabase 'shares' tabel, met fallback naar query-params
async function buildShareUrlForList(list) {
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const shareData = {
        title: list.title || '',
        langFrom: list.langFrom || '',
        langTo: list.langTo || '',
        words: (list.words || []).map(w => ({ term: w.term, definition: w.definition }))
    };

    // Probeer via Supabase korte link te maken
    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient
                .from('shares')
                .insert([{ data: shareData }])
                .select('id')
                .single();
            if (!error && data) {
                return `${baseUrl}?share=${data.id}`;
            }
            console.warn('Share insert mislukt, fallback naar query-params:', error);
        } catch (e) {
            console.warn('Share via Supabase mislukt, fallback:', e);
        }
    }

    // Fallback: oude methode via query-params
    const dataStr = (list.words || []).map(w => `${w.term}\t${w.definition}`).join('\n');
    const params = new URLSearchParams({
        import: '1',
        title: list.title || '',
        langFrom: list.langFrom || '',
        langTo: list.langTo || '',
        data: dataStr
    });
    const fullUrl = `${baseUrl}?${params.toString()}`;
    if (fullUrl.length > 2000) {
        alert('Waarschuwing: deze deellink is erg lang en werkt mogelijk niet in alle browsers. Gebruik bij voorkeur een kleiner woordenlijst.');
    }
    return fullUrl;
}

async function openQrShareModal() {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;

    const qrImage = document.getElementById('qr-share-image');
    const linkInput = document.getElementById('qr-share-link');
    const modal = document.getElementById('qr-share-modal');
    if (!qrImage || !linkInput || !modal) return;

    // Toon modal alvast met loading state
    linkInput.value = 'Link genereren...';
    modal.classList.remove('hidden');
    qrImage.src = '';

    const shareUrl = await buildShareUrlForList(list);
    const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(shareUrl)}`;
    qrImage.src = qrSrc;
    linkInput.value = shareUrl;
}

function closeQrShareModal() {
    const modal = document.getElementById('qr-share-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

async function copyQrShareLink() {
    const input = document.getElementById('qr-share-link');
    if (!input || !input.value) return;
    await navigator.clipboard.writeText(input.value);
    alert('Deellink gekopieerd!');
}

// ===== Supabase Auth & Sync =====
function initSupabase() {
    if (!isCloudEnabled()) return;
    if (!window.supabase) return;

    const SUPABASE_URL = 'https://sngiduythwiuthrtzmch.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZ2lkdXl0aHdpdXRocnR6bWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNDY5MzUsImV4cCI6MjA4NTYyMjkzNX0.xNecbmT6VRPPhBVnW5WQv-QdJp4o2MDZq4tV-jsJXLI';

    // Basic sanity-checks to avoid accidental DNS errors with placeholder values
    if (SUPABASE_URL.includes('YOUR_PROJECT') || SUPABASE_ANON_KEY.includes('YOUR_ANON_KEY')) {
        console.error('Supabase niet geconfigureerd — voeg SUPABASE_URL en SUPABASE_ANON_KEY toe in app.js');
        document.getElementById('auth-login-btn')?.classList.add('hidden');
        document.getElementById('auth-signup-btn')?.classList.add('hidden');
        return;
    }

    // Create or reuse the client to avoid multiple GoTrue instances
    if (window.__loek_supabase_client) {
        supabaseClient = window.__loek_supabase_client;
        console.info('Reusing existing Supabase client instance.');
    } else {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        window.__loek_supabase_client = supabaseClient;
        // Expose config for debug helpers
        window.__LOEK_SUPABASE_CONFIG = { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY };
        console.info('Supabase client initialized. Ensure you have created RLS policies (see README/SQL) to protect user data.');
    }

    supabaseClient.auth.getSession().then(({ data }) => {
        authUser = data.session?.user || null;
        updateAuthUI();
        if (authUser) {
            loadRemoteLists();
        }
    });

    supabaseClient.auth.onAuthStateChange((_event, session) => {
        authUser = session?.user || null;
        updateAuthUI();
        if (authUser) {
            loadRemoteLists();
        } else {
            wordLists = JSON.parse(localStorage.getItem('wordLists')) || [];
            renderWordLists();
        }
    });
}

function updateAuthUI() {
    const loginBtn = document.getElementById('auth-login-btn');
    const signupBtn = document.getElementById('auth-signup-btn');
    const logoutBtn = document.getElementById('auth-logout-btn');
    const userLabel = document.getElementById('auth-user');
    const menuBtn = document.getElementById('auth-menu-btn');
    const avatarInitial = document.getElementById('auth-avatar-initial');

    if (authUser) {
        if (loginBtn) loginBtn.classList.add('hidden');
        if (signupBtn) signupBtn.classList.add('hidden');
        if (logoutBtn) logoutBtn.classList.remove('hidden');
        if (userLabel) {
            userLabel.textContent = authUser.email;
            userLabel.classList.remove('hidden');
        }
        if (menuBtn) menuBtn.classList.add('logged-in');
        if (avatarInitial) {
            const initial = authUser.email?.trim()?.[0] || '?';
            avatarInitial.textContent = initial.toUpperCase();
        }
    } else {
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (signupBtn) signupBtn.classList.remove('hidden');
        if (logoutBtn) logoutBtn.classList.add('hidden');
        if (userLabel) {
            userLabel.textContent = '';
            userLabel.classList.add('hidden');
        }
        if (menuBtn) menuBtn.classList.remove('logged-in');
        if (avatarInitial) avatarInitial.textContent = '?';
    }
}

function toggleAuthMenu(event) {
    if (!isCloudEnabled()) return;
    event.stopPropagation();
    const menu = document.getElementById('auth-menu');
    if (!menu) return;
    menu.classList.toggle('hidden');
}

function closeAuthMenu() {
    const menu = document.getElementById('auth-menu');
    if (!menu) return;
    menu.classList.add('hidden');
}

function openAuthModal(mode) {
    if (!isCloudEnabled()) return;
    authMode = mode;
    closeAuthMenu();
    document.getElementById('auth-modal').classList.remove('hidden');
    document.getElementById('auth-title').innerHTML = mode === 'signup'
        ? `<i class="fas fa-user-plus"></i> ${t('auth_modal_signup_title')}`
        : `<i class="fas fa-user"></i> ${t('auth_modal_login_title')}`;
    document.getElementById('auth-submit-btn').innerHTML = mode === 'signup'
        ? `<i class="fas fa-check"></i> ${t('auth_modal_signup_submit')}`
        : `<i class="fas fa-check"></i> ${t('auth_modal_login_submit')}`;
    document.getElementById('auth-error').classList.add('hidden');
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.add('hidden');
}

function openAppSettings() {
    const modal = document.getElementById('app-settings-modal');
    const toggle = document.getElementById('cloud-enabled-toggle');
    if (toggle) toggle.checked = isCloudEnabled();
    const darkToggle = document.getElementById('dark-mode-toggle');
    if (darkToggle) darkToggle.checked = isDarkModeEnabled();
    const logoToggle = document.getElementById('dynamic-logo-toggle');
    if (logoToggle) logoToggle.checked = isDynamicLogoEnabled();
    const colorPicker = document.getElementById('accent-color-picker');
    const colorInput = document.getElementById('accent-color-input');
    const accent = getAccentColor();
    if (colorPicker) colorPicker.value = accent;
    if (colorInput) colorInput.value = accent;
    renderPresetColors();

    const subjectContainer = document.getElementById('settings-subjects-container');
    if (subjectContainer) {
        const availableSubjects = [
            { key: 'duits', i18n: 'subj_de' },
            { key: 'frans', i18n: 'subj_fr' },
            { key: 'engels', i18n: 'subj_en' },
            { key: 'nederlands', i18n: 'subj_nl' },
            { key: 'spaans', i18n: 'subj_es' },
            { key: 'italiaans', i18n: 'subj_it' },
            { key: 'latijn', i18n: 'subj_la' },
            { key: 'grieks', i18n: 'subj_gr' },
            { key: 'natuurkunde', i18n: 'subj_nat' },
            { key: 'scheikunde', i18n: 'subj_chem' },
            { key: 'biologie', i18n: 'subj_bio' },
            { key: 'other', i18n: 'subj_other' }
        ];

        subjectContainer.innerHTML = availableSubjects.map(sub => {
            const isChecked = visibleHomeSubjects.includes(sub.key);
            const flag = subjectFlagsMap[sub.key] || '<i class="fas fa-book"></i>';
            return `
                <label class="settings-subject-checkbox">
                    <input type="checkbox" value="${sub.key}" ${isChecked ? 'checked' : ''} onchange="toggleVisibleSubject(this)">
                    <span class="subject-checkbox-icon">${flag}</span>
                    <span class="subject-checkbox-label">${t(sub.i18n)}</span>
                </label>
            `;
        }).join('');
    }

    if (modal) modal.classList.remove('hidden');
}

function toggleVisibleSubject(checkbox) {
    if (checkbox.checked) {
        if (!visibleHomeSubjects.includes(checkbox.value)) {
            visibleHomeSubjects.push(checkbox.value);
        }
    } else {
        visibleHomeSubjects = visibleHomeSubjects.filter(v => v !== checkbox.value);
    }
    localStorage.setItem('visibleHomeSubjects', JSON.stringify(visibleHomeSubjects));
    renderHomeSubjectFilters(); // Immediately update the UI behind the modal
    renderWordLists(); // Refresh active lists in home view
}

function closeAppSettings() {
    const modal = document.getElementById('app-settings-modal');
    if (modal) modal.classList.add('hidden');
}

function saveAppSettings() {
    closeAppSettings();
}

function toggleAccordion(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('open');
}

function isDarkModeEnabled() {
    return localStorage.getItem(DARK_MODE_SETTINGS_KEY) === 'true';
}

function setDarkModeEnabled(enabled) {
    localStorage.setItem(DARK_MODE_SETTINGS_KEY, enabled ? 'true' : 'false');
    applyTheme();
}

function isDynamicLogoEnabled() {
    const val = localStorage.getItem(DYNAMIC_LOGO_SETTINGS_KEY);
    if (val === null) return true; // Default ON
    return val === 'true';
}

function setDynamicLogoEnabled(enabled) {
    localStorage.setItem(DYNAMIC_LOGO_SETTINGS_KEY, enabled ? 'true' : 'false');
    applyTheme();
}

function applyTheme() {
    const enabled = isDarkModeEnabled();
    const dynamicLogo = isDynamicLogoEnabled();
    document.body.classList.toggle('dark', enabled);
    document.body.classList.toggle('dynamic-logo-enabled', dynamicLogo);
    applyAccentColor(getAccentColor());
}

function updateFavicon(primary, dark) {
    let faceColor = primary === '#FFD93D' ? '#fdc204' : primary;
    let noseColor = primary === '#FFD93D' ? '#e89d05' : dark;

    const svgTemplate = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="176" height="208" viewBox="0 0 176 208">
        <g transform="translate(-159.0253,-68.68503)">
            <path d="M181.26891,221.58907c0,-35.86713 -15.34531,-76.82861 -15.34531,-95.60829c0,-13.0457 32.33336,-40.63191 45.79687,-40.63191c17.32149,0 57.70153,0 86.87844,0c15.47817,0 31.1881,20.35903 31.1881,31.69111c0,18.98627 0,71.43517 0,108.68152c0,17.97676 -33.55751,45.55451 -48.41883,45.55451c-14.73709,0 -33.52207,-14.97104 -60.10484,-14.97104c-22.08538,0 -39.99443,-14.61957 -39.99443,-34.71588z" fill="#fcf1d1" stroke="#000000" stroke-width="10.5"/>
            <path d="M164.2753,236.84929c0,-35.86713 0,-89.17972 0,-107.9594c0,-13.0457 16.98805,-28.2808 30.45156,-28.2808c17.32149,0 62.41166,0 91.58857,0c15.47817,0 26.47797,12.50881 26.47797,23.84089c0,18.98627 0,79.2854 0,116.53174c0,17.97676 -19.7093,30.58347 -34.57062,30.58347c-14.73709,0 -47.37028,0 -73.95305,0c-22.08538,0 -39.99443,-14.61957 -39.99443,-34.71588z" fill="${faceColor}" stroke="#000000" stroke-width="10.5"/>
            <path d="M190.45269,198.23019l-25.47516,-7.12449" fill="none" stroke="#000000" stroke-width="10.5" stroke-linecap="round"/>
            <path d="M231.85421,218.76247c0,-1.27379 -0.52642,-3.29545 -0.61386,-5.61272c-0.26314,-6.9742 -0.32251,-16.62602 -0.32251,-16.62602h16.38644c0,0 -0.26981,10.85447 -0.74615,17.80403c-0.1172,1.70987 -1.12659,3.18335 -1.12659,4.20061c0,2.35306 0.114,10.27828 -7.02376,9.84237c-5.5897,-0.09866 -6.55357,-7.7658 -6.55357,-9.60827z" fill="${noseColor}"/>
            <path d="M231.1334,195.44147c1.09524,-2.06216 4.9423,-2.34092 6.96327,-2.34092c1.7688,0 5.76702,0.55632 6.84807,2.57501" fill="none" stroke="#000000" stroke-width="10.5" stroke-linecap="round"/>
            <path d="M231.42856,202.26057c0,11.56814 -9.60111,20.94597 -21.44468,20.94597c-11.84357,0 -21.44468,-9.37783 -21.44468,-20.94597c0,-11.56814 9.60111,-20.94597 21.44468,-20.94597c11.84357,0 21.44468,9.37783 21.44468,20.94597z" fill="#fcfcfc" stroke="#000000" stroke-width="8.5"/>
            <path d="M288.39697,202.81283c0,11.56814 -9.60111,20.94597 -21.44468,20.94597c-11.84357,0 -21.44469,-9.37783 -21.44469,-20.94597c0,-11.56814 9.60112,-20.94597 21.44469,-20.94597c11.84357,0 21.44468,9.37783 21.44468,20.94597z" fill="#fcfcfc" stroke="#000000" stroke-width="8.5"/>
            <path d="M288.42805,196.44152l21.26151,-5.95403" fill="none" stroke="#000000" stroke-width="10.5" stroke-linecap="round"/>
            <path d="M256.90206,237.9935c0,0 -3.16122,15.66449 -17.08871,15.45007c-14.93715,-0.57176 -17.08872,-15.45007 -17.08872,-15.45007" fill="none" stroke="#000000" stroke-width="5.5" stroke-linecap="round"/>
            <path d="M205.64506,200.0706c0,-3.61999 2.93458,-6.55457 6.55457,-6.55457c3.61999,0 6.55458,2.93458 6.55458,6.55458c0,3.61999 -2.93458,6.55458 -6.55457,6.55458c-3.61999,0 -6.55457,-2.93458 -6.55457,-6.55457z" fill="#000000" stroke="#000000" stroke-width="0.5"/>
            <path d="M262.58891,199.787c0,-3.61999 2.93458,-6.55457 6.55457,-6.55457c3.61999,0 6.55458,2.93458 6.55458,6.55458c0,3.61999 -2.93459,6.55458 -6.55457,6.55458c-3.61999,0 -6.55457,-2.93458 -6.55457,-6.55457z" fill="#000000" stroke="none" stroke-width="0"/>
            <path d="M200.71999,159.49466c0,0 5.23481,-8.77689 12.63142,-9.9159c10.80313,-1.66359 18.26872,6.40452 18.26872,6.40452" fill="none" stroke="#000000" stroke-width="6" stroke-linecap="round"/>
            <path d="M248.94293,156.21738c0,0 6.85263,-6.20051 17.86228,-5.44591c8.9574,0.61395 13.03785,8.95729 13.03785,8.95729" fill="none" stroke="#000000" stroke-width="6" stroke-linecap="round"/>
            <path d="M209.3206,116.68132c-9.91379,-3.09959 -18.80188,-14.9667 -23.63838,-22.56556c-14.59159,-22.92555 4.61742,-15.45305 6.78667,-14.61521c7.0794,2.50232 18.23168,10.40104 13.37438,-2.67487c-4.02674,-5.94388 3.66876,-6.3546 7.48965,-5.61724c3.8209,0.73736 19.00336,12.23009 23.00392,11.76945c3.14477,-0.3621 -3.45621,-7.61097 -0.53498,-9.62955c4.0414,-2.79261 11.97713,-2.89832 18.18915,0.80246c2.37993,1.41783 27.55058,25.1354 21.22596,27.7469c-3.30286,1.36379 -9.26644,1.78611 -13.70766,3.09569c-6.71153,1.97902 -13.26955,4.47796 -19.95993,6.13634c-14.09302,3.49331 -26.39174,7.37657 -32.22878,5.55159z" fill="#000000" stroke="#000000" stroke-width="4.5" stroke-linecap="round"/>
        </g>
    </svg>`;

    const encodedSvg = window.btoa(svgTemplate);
        document.querySelectorAll("link[rel*='icon']").forEach(link => {
        link.type = "image/svg+xml";
        link.href = `data:image/svg+xml;base64,${encodedSvg}`;
    });
}

function normalizeHexColor(value) {
    if (!value) return null;
    const hex = value.trim();
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) return hex.toUpperCase();
    if (/^#[0-9A-Fa-f]{3}$/.test(hex)) {
        return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`.toUpperCase();
    }
    return null;
}

function getAccentColor() {
    return normalizeHexColor(localStorage.getItem(ACCENT_COLOR_SETTINGS_KEY)) || DEFAULT_ACCENT_COLOR;
}

function setAccentColor(value) {
    const normalized = normalizeHexColor(value) || DEFAULT_ACCENT_COLOR;
    localStorage.setItem(ACCENT_COLOR_SETTINGS_KEY, normalized);
    applyAccentColor(normalized);
}

function resetAccentColor() {
    setAccentColor(DEFAULT_ACCENT_COLOR);
    const colorPicker = document.getElementById('accent-color-picker');
    const colorInput = document.getElementById('accent-color-input');
    if (colorPicker) colorPicker.value = DEFAULT_ACCENT_COLOR;
    if (colorInput) colorInput.value = DEFAULT_ACCENT_COLOR;
}

function applyAccentColor(color) {
    const normalized = normalizeHexColor(color) || DEFAULT_ACCENT_COLOR;
    const isDark = isDarkModeEnabled();
    const palette = buildAccentPalette(normalized, isDark);
    const root = document.documentElement;
    root.style.setProperty('--primary-yellow', palette.primary);
    root.style.setProperty('--primary-yellow-dark', palette.dark);
    root.style.setProperty('--primary-glow', palette.glow);
    
    // In dark mode, primary-yellow-light should be semi-transparent
    if (isDark) {
        root.style.setProperty('--primary-yellow-light', palette.glow);
        root.style.setProperty('--bg-cream', palette.bgCreamDark);
        root.style.setProperty('--bg-light', palette.bgLightDark);
    } else {
        root.style.setProperty('--primary-yellow-light', palette.light);
        root.style.setProperty('--bg-cream', palette.bgCream);
        root.style.setProperty('--bg-light', palette.bgLight);
    }

    // Update Favicon with dynamic colors
    updateFavicon(palette.primary, palette.dark);

    // Special handling for default yellow theme
    document.body.classList.toggle('default-yellow-theme', normalized === '#FFD93D');
}

function buildAccentPalette(hex, isDarkMode = false) {
    const rgb = hexToRgb(hex);
    if (!rgb) {
        return { 
            primary: DEFAULT_ACCENT_COLOR, 
            dark: '#E6B800', 
            light: '#FFF3B8', 
            glow: 'rgba(255, 217, 61, 0.3)',
            bgCream: '#FFFEF7',
            bgCreamDark: '#0b0f17',
            bgLight: '#FFF9E6',
            bgLightDark: '#111827'
        };
    }

    const glow = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${isDarkMode ? 0.2 : 0.35})`;
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    // Detect if color is dark (lightness < 0.5)
    const isColorDark = hsl.l < 0.5;
    
    // For icons: if color is dark, make them lighter
    let dark, light;
    if (isColorDark) {
        // Lighten for dark colors
        dark = hslToHex(hsl.h, clamp(hsl.s * 0.9, 0.3, 1), clamp(hsl.l + 0.15, 0.4, 0.7));
        light = hslToHex(hsl.h, clamp(hsl.s * 0.7, 0.2, 1), clamp(hsl.l + 0.35, 0.7, 0.95));
    } else {
        // Darken for light colors
        dark = hslToHex(hsl.h, hsl.s, clamp(hsl.l - 0.2, 0.1, 0.9));
        light = hslToHex(hsl.h, clamp(hsl.s - 0.05, 0.15, 1), clamp(hsl.l + 0.28, 0.2, 0.95));
    }
    
    // Background cream - subtle tinted version
    const bgCream = hslToHex(hsl.h, clamp(hsl.s * 0.15, 0.05, 0.15), clamp(hsl.l + 0.42, 0.92, 0.99));
    
    // Background light - slightly less subtle
    const bgLight = hslToHex(hsl.h, clamp(hsl.s * 0.25, 0.08, 0.25), clamp(hsl.l + 0.38, 0.88, 0.96));
    
    // Dark mode background - darker tinted version
    const bgCreamDark = hslToHex(hsl.h, clamp(hsl.s * 0.25, 0.08, 0.25), clamp(hsl.l * 0.15, 0.04, 0.1));
    
    // Dark mode bg-light - slightly lighter than bg-cream
    const bgLightDark = hslToHex(hsl.h, clamp(hsl.s * 0.3, 0.1, 0.35), clamp(hsl.l * 0.25, 0.06, 0.13));
    
    return { primary: hex.toUpperCase(), dark, light, glow, bgCream, bgLight, bgCreamDark, bgLightDark };
}

function hexToRgb(hex) {
    const normalized = normalizeHexColor(hex);
    if (!normalized) return null;
    const value = normalized.slice(1);
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    return { r, g, b };
}

function rgbToHsl(r, g, b) {
    const rn = r / 255;
    const gn = g / 255;
    const bn = b / 255;
    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    const delta = max - min;
    let h = 0;
    if (delta !== 0) {
        if (max === rn) h = ((gn - bn) / delta) % 6;
        else if (max === gn) h = (bn - rn) / delta + 2;
        else h = (rn - gn) / delta + 4;
        h = Math.round(h * 60);
        if (h < 0) h += 360;
    }
    const l = (max + min) / 2;
    const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    return { h: h / 360, s, l };
}

function hslToHex(h, s, l) {
    const { r, g, b } = hslToRgb(h, s, l);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function hslToRgb(h, s, l) {
    const hue = h * 360;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    const m = l - c / 2;
    let r1 = 0;
    let g1 = 0;
    let b1 = 0;

    if (hue >= 0 && hue < 60) {
        r1 = c; g1 = x; b1 = 0;
    } else if (hue >= 60 && hue < 120) {
        r1 = x; g1 = c; b1 = 0;
    } else if (hue >= 120 && hue < 180) {
        r1 = 0; g1 = c; b1 = x;
    } else if (hue >= 180 && hue < 240) {
        r1 = 0; g1 = x; b1 = c;
    } else if (hue >= 240 && hue < 300) {
        r1 = x; g1 = 0; b1 = c;
    } else {
        r1 = c; g1 = 0; b1 = x;
    }

    return {
        r: Math.round((r1 + m) * 255),
        g: Math.round((g1 + m) * 255),
        b: Math.round((b1 + m) * 255)
    };
}

function toHex(value) {
    return value.toString(16).padStart(2, '0');
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function renderPresetColors() {
    const container = document.getElementById('preset-colors');
    if (!container) return;
    const currentColor = getAccentColor();
    container.innerHTML = PRESET_COLORS.map(color => `
        <button class="preset-color-btn ${color === currentColor ? 'active' : ''}" 
                style="background-color: ${color};"
                onclick="selectPresetColor('${color}')"
                aria-label="Kleur ${color}">
            ${color === currentColor ? '<i class="fas fa-check"></i>' : ''}
        </button>
    `).join('');
}

function selectPresetColor(color) {
    const normalized = normalizeHexColor(color) || DEFAULT_ACCENT_COLOR;
    setAccentColor(normalized);
    const colorPicker = document.getElementById('accent-color-picker');
    const colorInput = document.getElementById('accent-color-input');
    if (colorPicker) colorPicker.value = normalized;
    if (colorInput) colorInput.value = normalized;
    renderPresetColors();
}

function isCloudEnabled() {
    const value = localStorage.getItem(CLOUD_SETTINGS_KEY);
    if (value === null) return true;
    return value === 'true';
}

function setCloudEnabled(enabled) {
    localStorage.setItem(CLOUD_SETTINGS_KEY, enabled ? 'true' : 'false');
    applyCloudState();
}

function applyCloudState() {
    const enabled = isCloudEnabled();
    document.body.classList.toggle('cloud-disabled', !enabled);

    if (!enabled) {
        // Reset cloud state
        supabaseClient = null;
        authUser = null;
        closeAuthMenu();
        updateAuthUI();

        const publicInput = document.getElementById('search-view-input');
        const publicResults = document.getElementById('search-view-results');
        if (publicInput) publicInput.value = '';
        if (publicResults) publicResults.innerHTML = '';
    } else {
        initSupabase();
    }
}

async function submitAuth() {
    if (!isCloudEnabled()) return;
    if (!supabaseClient) return;
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value.trim();
    const errorEl = document.getElementById('auth-error');
    const submitBtn = document.getElementById('auth-submit-btn');

    if (!email || !password) {
        errorEl.textContent = t('auth_error_fill');
        errorEl.classList.remove('hidden');
        return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Bezig...';
    errorEl.classList.add('hidden');

    try {
        let result;
        if (authMode === 'signup') {
            result = await supabaseClient.auth.signUp({ email, password });
        } else {
            result = await supabaseClient.auth.signInWithPassword({ email, password });
        }

        if (result.error) {
            errorEl.textContent = result.error.message;
            errorEl.classList.remove('hidden');
            return;
        }

        showToast(authMode === 'signup' ? 'Account aangemaakt!' : 'Ingelogd!', 'success');
        closeAuthModal();
        closeAuthMenu();
    } catch (err) {
        errorEl.textContent = 'Er ging iets mis. Probeer het later opnieuw.';
        errorEl.classList.remove('hidden');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = authMode === 'signup'
            ? '<i class="fas fa-check"></i> Registreren'
            : '<i class="fas fa-check"></i> Inloggen';
    }
}

async function logout() {
    if (!isCloudEnabled()) return;
    if (!supabaseClient) return;
    await supabaseClient.auth.signOut();
}

async function loadRemoteLists() {
    if (!supabaseClient || !authUser) return;
    const { data, error } = await supabaseClient
        .from('word_lists')
        .select('*')
        .eq('user_id', authUser.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Load lists failed', error);
        alert('Online lijsten laden is mislukt. Controleer je Supabase RLS policies.');
        return;
    }

    wordLists = (data || []).map(row => ({
        id: row.id,
        title: row.title,
        langFrom: row.lang_from,
        langTo: row.lang_to,
        subject: row.subject,
        icon: row.icon,
        words: row.words || [],
        isPublic: row.is_public,
        createdAt: row.created_at,
        lastStudied: row.last_studied ? new Date(row.last_studied).getTime() : null,
        status: row.status || 'not_started',
        progressPct: row.progress_pct || 0,
        totalCorrect: row.total_correct || 0,
        totalWrong: row.total_wrong || 0
    }));

    saveData();
    renderWordLists();
}

function isValidUUID(str) {
    return typeof str === 'string' && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(str);
}

async function saveListToRemote(listId) {
    if (!supabaseClient || !authUser) return;
    const list = wordLists.find(l => l.id === listId);
    if (!list) return;

    const searchText = list.words.map(w => `${w.term} ${w.definition}`).join(' ').slice(0, 2000);

    // Build payload and omit id if it's not a valid UUID so Postgres can generate one
    const progress = calculateListProgress(list);
    const payload = {
        user_id: authUser.id,
        title: list.title,
        lang_from: list.langFrom,
        lang_to: list.langTo,
        subject: list.subject,
        icon: list.icon,
        words: list.words,
        is_public: !!list.isPublic,
        search_text: searchText,
        updated_at: new Date().toISOString(),
        status: progress.status,
        progress_pct: progress.progressPct,
        total_correct: progress.totalCorrect,
        total_wrong: progress.totalWrong,
        last_studied: list.lastStudied ? new Date(list.lastStudied).toISOString() : null
    };
    if (isValidUUID(list.id)) payload.id = list.id;

    try {
        // Log session/token presence to help debug auth related 400s
        try {
            const sess = await supabaseClient.auth.getSession();
            console.debug('Supabase session present:', !!sess?.data?.session);
        } catch (e) {
            console.debug('Could not read session prior to save:', e?.message || e);
        }

        // Request returning rows so we can capture generated UUIDs
        const resp = await supabaseClient
            .from('word_lists')
            .upsert(payload, { onConflict: 'id' })
            .select('*');

        if (resp.error) {
            // Log detailed response for debugging
            console.error('Save list failed (detailed):', {
                status: resp.status || 'unknown',
                error: resp.error,
                data: resp.data
            });

            // Attempt a manual REST call to capture full response body for debugging
            try {
                await debugRestSave(list);
            } catch (e) {
                console.error('Manual REST debug save also failed:', e);
            }

            throw resp.error;
        }

        // If DB generated an id (when we omitted id), update local list id with returned value
        if (resp.data && resp.data[0] && resp.data[0].id && !isValidUUID(list.id)) {
            list.id = resp.data[0].id;
            saveData();
            renderWordLists();
        }

        return resp.data;
    } catch (err) {
        console.error('Save list exception:', err);
        throw err;
    }
}

async function deleteListFromRemote(listId) {
    if (!supabaseClient || !authUser) return;
    await supabaseClient
        .from('word_lists')
        .delete()
        .eq('id', listId)
        .eq('user_id', authUser.id);
}

// Debug helper: perform manual REST request to Supabase to capture full response body
async function debugRestSave(list) {
    const cfg = window.__LOEK_SUPABASE_CONFIG;
    if (!cfg || !cfg.url) {
        console.warn('Supabase config not exposed on window; cannot run debug REST save.');
        return;
    }

    // Try to get a user access token
    let token = null;
    try {
        const sess = await supabaseClient.auth.getSession();
        token = sess?.data?.session?.access_token || null;
    } catch (e) {
        console.debug('Could not read access token for debug saving:', e?.message || e);
    }

    // Build REST payload, omit id if it's not a valid UUID
    const restPayload = [{
        user_id: list.userId || list.user_id || (authUser && authUser.id),
        title: list.title,
        lang_from: list.langFrom,
        lang_to: list.langTo,
        subject: list.subject,
        icon: list.icon,
        words: list.words,
        is_public: !!list.isPublic,
        search_text: (list.words || []).map(w => `${w.term} ${w.definition}`).join(' ').slice(0,2000),
        updated_at: new Date().toISOString()
    }];
    if (isValidUUID(list.id)) restPayload[0].id = list.id;

    const url = `${cfg.url.replace(/\/$/, '')}/rest/v1/word_lists?on_conflict=id`;
    const headers = {
        'Content-Type': 'application/json',
        apikey: cfg.anonKey
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    console.debug('Debug REST save request url:', url);
    console.debug('Debug REST save request headers:', Object.keys(headers));
    console.debug('Debug REST save payload sample:', restPayload[0]);

    const resp = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(restPayload)
    });

    const text = await resp.text();
    console.error('Debug REST save response status:', resp.status, resp.statusText);
    console.error('Debug REST save response body:', text);
    if (!resp.ok) throw new Error(`Debug REST save failed: ${resp.status}`);
    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}

function debouncedPublicSearch() {
    clearTimeout(publicSearchTimer);
    publicSearchTimer = setTimeout(() => {
        performSearch();
    }, 200);
}

// ===== Subsite Registry =====
const subsiteRegistry = [
    {
        title: 'Griekse Aoristus Oefenen',
        description: 'Oefen Griekse aoristus vormen (pseudo-sigmatisch, thematisch, imperfect)',
        url: 'aoristus/',
        icon: 'fa-university',
        tags: ['grieks', 'aoristus', 'werkwoorden', 'vervoegen', 'greek', 'conjugation', 'aorist']
    },
    {
        title: 'Duitse Oefeningen',
        description: 'Modale werkwoorden, derde naamval, voornaamwoorden, der/ein-groep',
        url: 'du/',
        icon: 'fa-flag',
        tags: ['duits', 'german', 'deutsch', 'modale werkwoorden', 'dativ', 'derde naamval', 'voornaamwoorden', 'der', 'ein', 'naamval', 'grammatica']
    },
    {
        title: 'Duitse Modale Werkwoorden',
        description: 'Oefen dürfen, können, mögen, müssen, sollen, wollen',
        url: 'du/modale-werkwoorden/',
        icon: 'fa-flag',
        tags: ['duits', 'modale werkwoorden', 'dürfen', 'können', 'mögen', 'müssen', 'sollen', 'wollen', 'modal']
    },
    {
        title: 'Duits - Derde Naamval (Dativ)',
        description: 'Oefen de Duitse derde naamval (Dativ)',
        url: 'du/derde-naamval/',
        icon: 'fa-flag',
        tags: ['duits', 'dativ', 'derde naamval', 'naamval', 'grammatica']
    },
    {
        title: 'Duits - Persoonlijke Voornaamwoorden',
        description: 'Oefen Duitse persoonlijke voornaamwoorden',
        url: 'du/Persvnw/',
        icon: 'fa-flag',
        tags: ['duits', 'voornaamwoorden', 'persoonlijk', 'pronouns', 'grammatica']
    },
    {
        title: 'Duits - Der- en Ein-Groep',
        description: 'Oefen de der- en ein-groep in alle naamvallen',
        url: 'du/der_ein-gruppe/',
        icon: 'fa-flag',
        tags: ['duits', 'der', 'ein', 'naamval', 'grammatica', 'artikel']
    },
    {
        title: 'English Learning Hub',
        description: 'Engels leren: grammatica en woordenschat',
        url: 'en/',
        icon: 'fa-flag-usa',
        tags: ['engels', 'english', 'grammar', 'vocabulary', 'hub']
    },
    {
        title: 'English Grammar Practice',
        description: 'Oefen Engelse werkwoordstijden (tenses)',
        url: 'english_verbs/',
        icon: 'fa-flag-usa',
        tags: ['engels', 'english', 'grammar', 'verbs', 'tenses', 'werkwoorden', 'present simple', 'past simple', 'present perfect', 'continuous']
    },
    {
        title: 'Engels Woorden Leren',
        description: 'Leer Engelse woorden met flashcards en spelling',
        url: 'english_words/',
        icon: 'fa-flag-usa',
        tags: ['engels', 'english', 'woorden', 'words', 'vocabulary', 'woordenschat', 'flashcards', 'spelling']
    },
    {
        title: 'Latijn Oefenen',
        description: 'Latijnse grammatica: werkwoorden, naamwoorden, voornaamwoorden',
        url: 'la/',
        icon: 'fa-book-open',
        tags: ['latijn', 'latin', 'grammatica', 'werkwoorden', 'naamwoorden', 'vervoegen']
    },
    {
        title: 'Latijn - Betrekkelijk Voornaamwoord',
        description: 'Oefen Latijnse betrekkelijke voornaamwoorden',
        url: 'la/betr_vnw/',
        icon: 'fa-book-open',
        tags: ['latijn', 'voornaamwoord', 'betrekkelijk', 'relative pronoun', 'grammatica']
    },
    {
        title: 'Latijn - Werkwoorden Oefenen',
        description: 'Oefen Latijnse werkwoorden en vervoegingen',
        url: 'la/ww/',
        icon: 'fa-book-open',
        tags: ['latijn', 'werkwoorden', 'vervoegen', 'conjugation', 'verbs']
    },
    {
        title: 'Latijn - Stamtijden Oefenen',
        description: 'Oefen Latijnse stamtijden',
        url: 'la/stamtijden/',
        icon: 'fa-book-open',
        tags: ['latijn', 'stamtijden', 'stem forms', 'werkwoorden']
    },
    {
        title: 'Latijn - Onregelmatige Werkwoorden',
        description: 'Oefen Latijnse onregelmatige werkwoorden',
        url: 'la/onregelmatige_ww/',
        icon: 'fa-book-open',
        tags: ['latijn', 'onregelmatig', 'irregular', 'werkwoorden']
    },
    {
        title: 'Latijn - Woorden Oefenen',
        description: 'Oefen Latijnse woordenschat',
        url: 'la/words/',
        icon: 'fa-book-open',
        tags: ['latijn', 'woorden', 'woordenschat', 'vocabulary']
    },
    {
        title: 'Latijn - Zelfstandig Naamwoord',
        description: 'Oefen Latijnse zelfstandige naamwoorden en verbuigingen',
        url: 'la/zn/',
        icon: 'fa-book-open',
        tags: ['latijn', 'zelfstandig naamwoord', 'naamwoord', 'noun', 'declension', 'verbuiging']
    }
];

function searchSubsites(query) {
    const q = query.toLowerCase();
    const words = q.split(/\s+/).filter(w => w.length > 0);

    return subsiteRegistry.filter(site => {
        const searchText = (site.title + ' ' + site.description + ' ' + site.tags.join(' ')).toLowerCase();
        return words.every(word => searchText.includes(word));
    });
}

function searchLocalLists(query) {
    const q = query.toLowerCase();
    const words = q.split(/\s+/).filter(w => w.length > 0);

    return wordLists.filter(list => {
        const searchText = [
            list.title,
            list.langFrom,
            list.langTo,
            list.subject,
            ...(list.words || []).map(w => w.term + ' ' + w.definition)
        ].join(' ').toLowerCase();
        return words.every(word => searchText.includes(word));
    });
}

async function performSearch() {
    const input = document.getElementById('search-view-input');
    const results = document.getElementById('search-view-results');
    if (!input || !results) return;

    const query = (input.value || '').trim();
    if (!query) {
        results.innerHTML = `<p class="search-view-prompt"><i class="fas fa-search"></i> ${t('search_prompt')}</p>`;
        return;
    }

    let html = '';

    // Search subsites
    const subsiteResults = searchSubsites(query);
    if (subsiteResults.length > 0) {
        html += subsiteResults.map(site => `
            <div class="public-list-card subsite-card">
                <div class="public-list-info">
                    <div class="public-list-title"><i class="fas ${site.icon}" style="color:var(--primary-yellow-dark);margin-right:0.4rem;"></i>${escapeHtml(site.title)}</div>
                    <div class="public-list-meta">${escapeHtml(site.description)}</div>
                </div>
                <a href="${site.url}" class="btn btn-primary subsite-link">
                    <i class="fas fa-external-link-alt"></i> Openen
                </a>
            </div>
        `).join('');
    }

    // Search local lists
    const localResults = searchLocalLists(query);
    if (localResults.length > 0) {
        html += localResults.map(list => `
            <div class="public-list-card">
                <div class="public-list-info">
                    <div class="public-list-title"><i class="fas ${list.icon || 'fa-book'}" style="color:var(--primary-yellow-dark);margin-right:0.4rem;"></i>${escapeHtml(list.title)}</div>
                    <div class="public-list-meta">${escapeHtml(list.langFrom || '')} → ${escapeHtml(list.langTo || '')} • ${t('words_count', {count: list.words?.length || 0, s: (list.words?.length || 0) !== 1 ? 's' : ''})}</div>
                </div>
                <button class="btn btn-primary" onclick="showListDetail('${list.id}')">
                    <i class="fas fa-play"></i> ${t('search_practice_btn')}
                </button>
            </div>
        `).join('');
    }

    // Search cloud lists if enabled
    if (isCloudEnabled() && supabaseClient) {
        try {
            const { data, error } = await supabaseClient
                .from('word_lists')
                .select('id,title,lang_from,lang_to,subject,icon,words,user_id')
                .eq('is_public', true)
                .or(`title.ilike.%${query.replace(/[%_\\]/g, '')}%,search_text.ilike.%${query.replace(/[%_\\]/g, '')}%`)
                .order('updated_at', { ascending: false })
                .limit(20);

            if (!error && data && data.length > 0) {
                html += data.map(list => `
                    <div class="public-list-card">
                        <div class="public-list-info">
                            <div class="public-list-title"><i class="fas fa-cloud" style="color:var(--primary-yellow-dark);margin-right:0.4rem;"></i>${escapeHtml(list.title)}</div>
                            <div class="public-list-meta">${escapeHtml(list.lang_from)} → ${escapeHtml(list.lang_to)} • ${t('words_count', {count: list.words?.length || 0, s: (list.words?.length || 0) !== 1 ? 's' : ''})}</div>
                        </div>
                        <button class="btn btn-primary" onclick="importPublicList('${list.id}')">
                            <i class="fas fa-download"></i> ${t('search_import_btn')}
                        </button>
                    </div>
                `).join('');
            }
        } catch (e) {
            // Cloud search failed, that's fine
        }
    }

    if (!html) {
        results.innerHTML = '<p class="public-search-empty">Geen resultaten gevonden.</p>';
    } else {
        results.innerHTML = html;
    }
}

function showSearchView() {
    triggerHaptic('light');
    showView('search-view');
    setTimeout(() => {
        const input = document.getElementById('search-view-input');
        if (input) input.focus();
    }, 100);
    // Show prompt if no query yet
    const results = document.getElementById('search-view-results');
    const input = document.getElementById('search-view-input');
    if (results && input && !input.value) {
        results.innerHTML = `<p class="search-view-prompt"><i class="fas fa-search"></i> ${t('search_prompt')}</p>`;
    }
}

// Legacy aliases kept for backwards compat (e.g. bookmarks/PWA)
function openMobileSearch() { showSearchView(); }
function closeMobileSearch() { showHome(); }

async function importPublicList(listId) {
    if (!isCloudEnabled()) return;
    if (!supabaseClient) return;
    const { data, error } = await supabaseClient
        .from('word_lists')
        .select('*')
        .eq('id', listId)
        .single();

    if (error || !data) return;

    // Check if list already exists locally (by title and words to catch duplicates)
    const existingList = wordLists.find(list =>
        list.title === data.title &&
        list.langFrom === data.lang_from &&
        list.langTo === data.lang_to &&
        list.words.length === (data.words || []).length
    );

    if (existingList) {
        // List already exists, just show it
        showListDetail(existingList.id);
        return;
    }

    const newList = {
        id: generateId(),
        title: data.title,
        langFrom: data.lang_from,
        langTo: data.lang_to,
        subject: data.subject,
        icon: data.icon,
        words: data.words || [],
        isPublic: false,
        createdAt: new Date().toISOString()
    };

    wordLists.push(newList);

    let openListId = newList.id;
    if (authUser) {
        const saved = await saveListToRemote(newList.id);
        if (saved && saved[0]?.id) openListId = saved[0].id;
        await loadRemoteLists();
    } else {
        saveData();
        renderWordLists();
    }

    showListDetail(openListId);
}

// ===== Study Mode Settings =====
function startStudyMode(mode, options = {}) {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list || list.words.length === 0) return;

    currentStudyMode = mode;
    studySession.emergencyMode = !!options.emergencyMode;
    studySession.emergencyWordIds = Array.isArray(options.emergencyWordIds) ? options.emergencyWordIds : [];

    if (mode === 'connect') {
        studySession.selectedWordIds = getSelectedWordIdsForStudy();
        initConnectMode();
        return;
    }

    // Show settings block only for modes that use answer-input settings
    const typingSettings = document.getElementById('typing-settings');
    const usesTyping = mode === 'steps' || mode === 'typing' || mode === 'exam';
    typingSettings.classList.toggle('hidden', !usesTyping);

    const learnStagesAccordion = document.getElementById('acc-learn-stages');
    if (learnStagesAccordion) {
        learnStagesAccordion.classList.toggle('hidden', mode !== 'steps');
    }
    const learnStagesSettings = document.getElementById('learn-stages-settings');
    if (learnStagesSettings) {
        learnStagesSettings.classList.toggle('hidden', mode !== 'steps');
    }

    const emergencyHint = document.getElementById('emergency-hint');
    if (emergencyHint) {
        emergencyHint.classList.toggle('hidden', !studySession.emergencyMode);
    }

    document.getElementById('settings-modal').classList.remove('hidden');
}

function closeSettingsModal() {
    document.getElementById('settings-modal').classList.add('hidden');
}

// Direction button handlers
document.querySelectorAll('.direction-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.direction-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

function confirmStartStudy() {
    const direction = document.querySelector('.direction-btn.active').dataset.direction;
    const acceptSlash = document.getElementById('accept-slash-answers').checked;
    const ignoreParentheses = document.getElementById('ignore-parentheses').checked;
    const ignorePunctuation = document.getElementById('ignore-punctuation') ? document.getElementById('ignore-punctuation').checked : true;
    const selectedWordIds = studySession.emergencyMode && studySession.emergencyWordIds?.length
        ? [...studySession.emergencyWordIds]
        : getSelectedWordIdsForStudy();
    const hintsEnabled = true;
    const allowMinorTypos = !!document.getElementById('allow-minor-typos')?.checked;
    const caseSensitiveAnswers = !!document.getElementById('case-sensitive-answers')?.checked;
    const strictDiacritics = !!document.getElementById('strict-diacritics')?.checked;
    const learnStages = currentStudyMode === 'steps'
        ? getEnabledLearnStages()
        : ['typing'];

    if (currentStudyMode === 'steps' && learnStages.length === 0) {
        alert('Kies minimaal 1 onderdeel voor Leren-modus.');
        return;
    }

    studySession = {
        ...studySession,
        direction,
        acceptSlash,
        ignoreParentheses,
        ignorePunctuation,
        hintsEnabled,
        allowMinorTypos,
        caseSensitiveAnswers,
        strictDiacritics,
        learnStages,
        startedAt: Date.now(),
        correctCount: 0,
        wrongCount: 0,
        sessionResults: {},
        selectedWordIds,
        hintUsageByWord: {},
        hintPenalizedWords: [],
        hintPenalty: 0,
        pendingAnswers: [],
        stepsWrongWords: [],
        stepsReviewMode: false,
        stepsReviewQueue: [],
        stepsReviewIndex: 0
    };

    // Update lastStudied timestamp when starting practice
    if (currentListId) {
        const list = wordLists.find(l => l.id === currentListId);
        if (list) {
            list.lastStudied = Date.now();
            saveData();
        }
    }

    closeSettingsModal();

    switch (currentStudyMode) {
        case 'steps':
            initStepsMode();
            break;
        case 'typing':
            initTypingMode();
            break;
        case 'cards':
            initCardsMode();
            break;
        case 'exam':
            initExamMode();
            break;
        case 'connect':
            initConnectMode();
            break;
    }

    clearActiveSession();
}

// ===== Answer Checking =====
function normalizeAnswer(answer, acceptSlash, ignoreParentheses, ignorePunctuation) {
    let normalized = (answer || '').trim();

    if (!studySession.caseSensitiveAnswers) {
        normalized = normalized.toLowerCase();
    }

    if (!studySession.strictDiacritics) {
        normalized = stripDiacriticsAndLooseMarks(normalized);
    } else {
        normalized = normalizeQuoteMarks(normalized);
    }
    
    if (ignoreParentheses) {
        normalized = normalized.replace(/\([^)]*\)/g, '').trim();
    }
    
    if (ignorePunctuation) {
        // Remove standard punctuation: . , ? ! ¿ ¡ ; :
        normalized = normalized.replace(/[.,?!¿¡;:]/g, '').replace(/\s+/g, ' ').trim();
    }
    
    return normalized;
}

function checkAnswer(userAnswer, correctAnswer) {
    const { acceptSlash, ignoreParentheses, ignorePunctuation } = studySession;
    
    const normalizedUser = normalizeAnswer(userAnswer, acceptSlash, ignoreParentheses, ignorePunctuation);
    let normalizedCorrect = normalizeAnswer(correctAnswer, acceptSlash, ignoreParentheses, ignorePunctuation);
    
    // Direct match
    if (normalizedUser === normalizedCorrect) return true;

    // Accept optional sb/sth tokens in correct answers
    if (containsOptionalTokens(correctAnswer)) {
        const strippedUser = stripOptionalTokens(userAnswer, ignoreParentheses);
        const strippedCorrect = stripOptionalTokens(correctAnswer, ignoreParentheses);
        if (strippedUser === strippedCorrect) return true;
    }
    
    // Check slash alternatives
    if (acceptSlash && correctAnswer.includes('/')) {
        const alternatives = correctAnswer.split('/').map(a => 
            normalizeAnswer(a.trim(), false, ignoreParentheses, ignorePunctuation)
        );
        if (alternatives.includes(normalizedUser)) return true;
    }

    if (studySession.allowMinorTypos && isMinorTypoMatch(userAnswer, correctAnswer)) {
        return true;
    }
    
    return false;
}

function getSubjectForCurrentList() {
    const list = wordLists.find(l => l.id === currentListId);
    return (list?.subject || '').toLowerCase().trim();
}

function isWordPracticed(word) {
    const stats = word?.stats || { correct: 0, wrong: 0 };
    return (stats.correct + stats.wrong) > 0;
}

function findRelatedWordHint(userAnswer, correctAnswer, currentWordId) {
    const subject = getSubjectForCurrentList();
    if (!subject) return null;

    const normalizedUser = normalizeAnswer(userAnswer, false, studySession.ignoreParentheses, studySession.ignorePunctuation);
    if (!normalizedUser) return null;

    const normalizedCorrect = normalizeAnswer(correctAnswer, false, studySession.ignoreParentheses, studySession.ignorePunctuation);

    for (const list of wordLists) {
        if ((list.subject || '').toLowerCase().trim() !== subject) continue;
        for (const word of (list.words || [])) {
            if (!isWordPracticed(word)) continue;
            if (currentWordId && word.id === currentWordId) continue;

            const termNorm = normalizeAnswer(word.term || '', false, studySession.ignoreParentheses, studySession.ignorePunctuation);
            const defNorm = normalizeAnswer(word.definition || '', false, studySession.ignoreParentheses, studySession.ignorePunctuation);

            if (termNorm && termNorm === normalizedUser && termNorm !== normalizedCorrect) {
                return { matched: word.term, counterpart: word.definition };
            }

            if (defNorm && defNorm === normalizedUser && defNorm !== normalizedCorrect) {
                return { matched: word.definition, counterpart: word.term };
            }
        }
    }

    return null;
}

function buildRelatedWordHint(userAnswer, correctAnswer, currentWordId) {
    const match = findRelatedWordHint(userAnswer, correctAnswer, currentWordId);
    if (!match) return '';
    return `
        <div class="other-word-hint">
            <i class="fas fa-lightbulb"></i>
            <span><strong>${escapeHtml(match.matched)}</strong> is het woord voor <strong>${escapeHtml(match.counterpart)}</strong>.</span>
        </div>
    `;
}

function containsOptionalTokens(answer) {
    return /\b(sb|sth)\b/i.test(answer);
}

function stripOptionalTokens(answer, ignoreParentheses) {
    let normalized = normalizeAnswer(answer, false, ignoreParentheses, studySession.ignorePunctuation);
    normalized = normalized.replace(/\b(sb|sth)\b/gi, '');
    normalized = normalized.replace(/\s*\/\s*/g, ' ');
    normalized = normalized.replace(/\s+/g, ' ').trim();
    return normalized;
}

function getQuestion(word) {
    const { direction } = studySession;
    const list = wordLists.find(l => l.id === currentListId);
    const langFrom = list ? list.langFrom : '';
    const langTo = list ? list.langTo : '';
    
    if (direction === 'mixed') {
        const isTermToDef = Math.random() < 0.5;
        return isTermToDef
            ? { question: word.term, answer: word.definition, isTermToDef: true, questionLang: langFrom, answerLang: langTo }
            : { question: word.definition, answer: word.term, isTermToDef: false, questionLang: langTo, answerLang: langFrom };
    }
    
    return direction === 'term-def'
        ? { question: word.term, answer: word.definition, isTermToDef: true, questionLang: langFrom, answerLang: langTo }
        : { question: word.definition, answer: word.term, isTermToDef: false, questionLang: langTo, answerLang: langFrom };
}

function buildHintText(correctAnswer, level) {
    const answer = (correctAnswer || '').trim();
    if (!answer) return 'Geen hint beschikbaar.';

    if (level === 1) {
        const firstChar = Array.from(answer).find(ch => /[\p{L}\p{N}]/u.test(ch)) || answer[0];
        return `Hint 1: Eerste letter: ${firstChar}`;
    }

    if (level === 2) {
        const dotted = Array.from(answer).map(ch => /\s/.test(ch) ? ' ' : '&bull;').join('');
        return `Hint 2: Lengte: ${dotted}`;
    }

    if (level === 3) {
        const vowels = /[aeiouyáàâäãåéèêëíìîïóòôöõúùûü]/i;
        const masked = Array.from(answer)
            .map(ch => {
                if (/\s/.test(ch)) return ' ';
                return vowels.test(ch) ? ch : '_';
            })
            .join('');
        return `Hint 3: Klinkers: ${masked}`;
    }

    return '';
}


function renderHintButton(wordId, correctAnswer, hintContainerId) {
    return '';
}

function requestHint(wordId, correctAnswer, hintContainerId) {
    return;
}

function startGhostTimer() {
    return;
}

function stopGhostTimer() {
    return;
}

function finalizeGhostRecord() {
    return null;
}

function renderExamSummary() {
    if (!isExamModeActive()) return '';
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return '';

    const wordsById = (list.words || []).reduce((acc, w) => {
        acc[w.id] = w;
        return acc;
    }, {});

    const wrongAnswers = (studySession.pendingAnswers || []).filter(item => !item.isCorrect);
    const rows = wrongAnswers.map(item => {
        const word = wordsById[item.wordId];
        const left = word ? escapeHtml(word.term) : '-';
        const right = word ? escapeHtml(word.definition) : '-';
        return `
            <div class="summary-row wrong">
                <span class="summary-term">${left}</span>
                <span class="summary-def">${right}</span>
                <span class="summary-stats">${t('exam_answer_row', {user: escapeHtml(item.userAnswer || ''), correct: escapeHtml(item.correctAnswer || '-')})}</span>
            </div>
        `;
    }).join('');

    if (!rows) {
        return `<p class="summary-empty">${t('exam_perfect')}</p>`;
    }

    return `
        <h4>${t('exam_errors_heading', {count: wrongAnswers.length})}</h4>
        ${rows}
    `;
}

function normalizeForSimilarity(text) {
    return (text || '')
        .toString()
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function levenshteinDistance(a, b) {
    const s = normalizeForSimilarity(a);
    const t = normalizeForSimilarity(b);
    if (s === t) return 0;
    if (!s.length) return t.length;
    if (!t.length) return s.length;

    const m = s.length;
    const n = t.length;
    const dp = new Array(n + 1);
    for (let j = 0; j <= n; j++) dp[j] = j;

    for (let i = 1; i <= m; i++) {
        let prev = dp[0];
        dp[0] = i;
        const si = s.charCodeAt(i - 1);
        for (let j = 1; j <= n; j++) {
            const tmp = dp[j];
            const cost = si === t.charCodeAt(j - 1) ? 0 : 1;
            dp[j] = Math.min(
                dp[j] + 1,
                dp[j - 1] + 1,
                prev + cost
            );
            prev = tmp;
        }
    }

    return dp[n];
}

function similarityScore(a, b) {
    const s = normalizeForSimilarity(a);
    const t = normalizeForSimilarity(b);
    const maxLen = Math.max(s.length, t.length);
    if (maxLen === 0) return 1;
    const dist = levenshteinDistance(s, t);
    return 1 - (dist / maxLen);
}

function pickSimilarWrongOptions(correctAnswer, candidates, count) {
    const correctNorm = normalizeForSimilarity(correctAnswer);
    const unique = [];
    const seen = new Set();

    candidates.forEach(c => {
        const value = (c || '').toString();
        const norm = normalizeForSimilarity(value);
        if (!norm) return;
        if (norm === correctNorm) return;
        if (seen.has(norm)) return;
        seen.add(norm);
        unique.push({ value, score: similarityScore(value, correctAnswer) });
    });

    unique.sort((a, b) => b.score - a.score);
    const top = unique.slice(0, Math.max(10, count));
    const picked = top.slice(0, count).map(x => x.value);

    if (picked.length < count) {
        const rest = unique.slice(top.length);
        while (picked.length < count && rest.length > 0) {
            picked.push(rest.shift().value);
        }
    }

    return picked.slice(0, count);
}

// ===== STEPS MODE (STAMPEN) =====
function initStepsMode() {
    const list = wordLists.find(l => l.id === currentListId);

    const selectedWords = getStudyWordsFromSelection(list.words);
    if (!selectedWords.length) {
        alert('Geen woorden gevonden met je huidige selectie/filters.');
        showListDetail(currentListId);
        return;
    }
    studySession.words = shuffleArray([...selectedWords]);
    studySession.learnedWords = [];
    studySession.activeSlots = [];
    studySession.nextWordIndex = 0;
    studySession.slotIndex = 0;
    studySession.roundVisits = 0;
    studySession.currentWordId = null;
    studySession.wordProgress = {};
    studySession.stepsWrongWords = [];
    studySession.stepsReviewMode = false;
    studySession.stepsReviewQueue = [];
    studySession.stepsReviewIndex = 0;

    studySession.words.forEach(word => {
        studySession.wordProgress[word.id] = {
            phase: getFirstLearnStage(),
            done: false,
            typingRemaining: 1,
            typingCooldown: 0
        };
    });

    fillActiveSlots();

    showView('study-steps-view');
    updateStepsProgress();
    showNextStepQuestion();
}

function getFirstLearnStage() {
    const stages = studySession.learnStages || [];
    return stages.length ? stages[0] : 'typing';
}

function getNextLearnStage(currentPhase) {
    const stages = studySession.learnStages || ['typing'];
    const index = stages.indexOf(currentPhase);
    if (index === -1) return null;
    return stages[index + 1] || null;
}

function advanceLearnPhase(wordId) {
    const progress = studySession.wordProgress[wordId];
    if (!progress) return;
    const nextPhase = getNextLearnStage(progress.phase);
    if (!nextPhase) {
        markWordLearned(wordId);
        return;
    }
    progress.phase = nextPhase;
    if (nextPhase === 'typing') {
        progress.typingRemaining = 1;
    }
}

function fillActiveSlots() {
    while (studySession.activeSlots.length < 4 && studySession.nextWordIndex < studySession.words.length) {
        const nextWord = studySession.words[studySession.nextWordIndex];
        studySession.activeSlots.push(nextWord.id);
        studySession.nextWordIndex++;
    }
}

function replaceCompletedSlots() {
    const remaining = studySession.activeSlots.filter(wordId =>
        wordId && !studySession.wordProgress[wordId].done
    );
    studySession.activeSlots = remaining;
    fillActiveSlots();
    studySession.slotIndex = 0;
    studySession.roundVisits = 0;
}

function updateStepsProgress() {
    const baseTotal = studySession.words.length;
    const reviewTotal = new Set(studySession.stepsWrongWords || []).size;
    const total = baseTotal + (reviewTotal > 0 ? reviewTotal : 0);

    const learned = studySession.learnedWords.length;
    const reviewDone = studySession.stepsReviewMode ? (studySession.stepsReviewCorrectIds || []).length : 0;
    const done = Math.min(total, learned + reviewDone);
    const percent = total > 0 ? (done / total) * 100 : 0;

    document.getElementById('steps-progress').style.width = `${percent}%`;
    document.getElementById('steps-progress-text').textContent = `${done}/${total}`;
}

function showNextStepQuestion() {
    if (studySession.stepsReviewMode) {
        showNextStepsReviewQuestion();
        return;
    }

    if (studySession.learnedWords.length === studySession.words.length) {
        if (studySession.stepsWrongWords.length > 0) {
            startStepsReviewTyping();
            return;
        }
        showComplete();
        return;
    }

    reduceStepsCooldowns();

    if (studySession.activeSlots.length === 0) {
        fillActiveSlots();
    }

    if (studySession.roundVisits >= studySession.activeSlots.length) {
        replaceCompletedSlots();
    }

    const wordId = getNextActiveWordId();
    if (!wordId) {
        replaceCompletedSlots();
        const retryWordId = getNextActiveWordId();
        if (!retryWordId) {
            setTimeout(() => showNextStepQuestion(), 200);
            return;
        }
        return showNextStepQuestion();
    }

    const word = studySession.words.find(w => w.id === wordId);
    if (!word) {
        showNextStepQuestion();
        return;
    }

    const progress = studySession.wordProgress[wordId];
    const qa = getQuestion(word);
    studySession.currentWordId = wordId;

    if (progress.phase === 'flash') {
        showStepFlash(word, qa);
        return;
    }

    if (progress.phase === 'choice') {
        showStepChoice(word, qa);
        return;
    }

    if (progress.phase === 'copy') {
        showStepCopy(word, qa);
        return;
    }

    if (progress.phase === 'hint') {
        showStepHint(word, qa);
        return;
    }

    if (progress.phase === 'typing') {
        showStepTyping(word, qa);
    }
}

function getNextActiveWordId() {
    const totalSlots = studySession.activeSlots.length;
    if (totalSlots === 0) return null;

    let tries = 0;
    while (tries < totalSlots) {
        const idx = studySession.slotIndex % totalSlots;
        const wordId = studySession.activeSlots[idx];
        studySession.slotIndex = (idx + 1) % totalSlots;
        studySession.roundVisits++;
        tries++;

        if (wordId && !studySession.wordProgress[wordId].done) {
            const progress = studySession.wordProgress[wordId];
            if (progress.phase === 'typing' && progress.typingCooldown > 0) {
                continue;
            }
            return wordId;
        }
    }

    // If all active typing words are on cooldown, allow next available word
    for (let i = 0; i < totalSlots; i++) {
        const wordId = studySession.activeSlots[i];
        if (wordId && !studySession.wordProgress[wordId].done) {
            return wordId;
        }
    }

    return null;
}

function reduceStepsCooldowns() {
    Object.values(studySession.wordProgress).forEach(progress => {
        if (progress.typingCooldown > 0) {
            progress.typingCooldown--;
        }
    });
}

function showStepFlash(word, qa) {
    const content = document.getElementById('steps-content');
    content.innerHTML = `
        <div class="question-card">
            <div class="flip-hint">${t('flash_flip_hint')}</div>
            <div class="flip-card" id="step-flash-card" onclick="flipStepFlash()">
                <div class="flip-card-inner" id="step-flash-inner">
                    <div class="flip-card-front">
                        <p>${escapeHtml(qa.question)}</p>
                    </div>
                    <div class="flip-card-back">
                        <p>${escapeHtml(qa.answer)}</p>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary" id="step-flash-next" onclick="continueStepFlash('${word.id}')" style="display: none;">
                <i class="fas fa-arrow-right"></i> ${t('next_btn')}
            </button>
        </div>
    `;
}

function flipStepFlash() {
    const card = document.getElementById('step-flash-card');
    const nextBtn = document.getElementById('step-flash-next');
    if (card) {
        card.classList.toggle('flipped');
        if (card.classList.contains('flipped') && nextBtn) {
            nextBtn.style.display = 'block';
        }
    }
}

function continueStepFlash(wordId) {
    advanceLearnPhase(wordId);
    showNextStepQuestion();
}

function showStepCopy(word, qa) {
    const content = document.getElementById('steps-content');
    currentCheckContext = { wordId: word.id, correct: qa.answer };
    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label">
                <i class="fas fa-pencil-alt"></i> ${t('copy_type_label')}
            </div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            <div class="copy-target-box">
                <p class="copy-target-label">${t('copy_target_label')}</p>
                <div class="copy-target-text">${escapeHtml(qa.answer)}</div>
            </div>
            <div class="typing-input-container">
                <input type="text" class="typing-input" id="step-copy-input"
                       placeholder="${t('copy_input_placeholder')}" autofocus autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false"
                       onkeydown="if(event.key==='Enter'){ event.preventDefault(); event.stopPropagation(); checkStepCopy('${word.id}', '${escapeHtml(qa.answer).replace(/&#39;/g, "\\&#39;")}'); }">
                ${getTremaHelperHtml('step-copy-input', qa.answerLang)}
                <button class="btn btn-primary typing-submit" id="step-copy-submit" onclick="checkStepCopy('${word.id}', '${escapeHtml(qa.answer).replace(/&#39;/g, "\\&#39;")}')">
                    <i class="fas fa-check"></i> ${t('check_btn')}
                </button>
            </div>
            <div id="step-copy-feedback"></div>
        </div>
    `;
    document.getElementById('step-copy-submit').onclick = () => checkStepCopy(currentCheckContext.wordId, currentCheckContext.correct);
    document.getElementById('step-copy-input').onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); checkStepCopy(currentCheckContext.wordId, currentCheckContext.correct); } };
    setTimeout(() => document.getElementById('step-copy-input')?.focus(), 100);
}

function checkStepCopy(wordId, correct) {
    const input = document.getElementById('step-copy-input');
    const feedback = document.getElementById('step-copy-feedback');
    const submitBtn = document.getElementById('step-copy-submit');
    if (!input || !feedback) return;

    const userAnswer = input.value;
    const isCorrect = checkAnswer(userAnswer, correct);
    input.classList.remove('correct', 'wrong');
    recordAnswer(wordId, isCorrect);

    if (isCorrect) {
        triggerHaptic('success');
        input.classList.add('correct');
        studySession.correctCount++;
        playCorrectSound();
        advanceLearnPhase(wordId);
        feedback.innerHTML = `
            <div class="feedback-message correct"><i class="fas fa-check-circle"></i> ${t('copy_correct_feedback')}</div>
            <button class="btn btn-primary btn-next" onclick="showNextStepQuestion()"><i class="fas fa-arrow-right"></i> ${t('next_question_btn')}</button>
        `;
    } else {
        triggerHaptic('heavy');
        input.classList.add('wrong');
        studySession.wrongCount++;
        studySession.stepsWrongWords.push(wordId);
        const diff = buildTypingDiff(userAnswer, correct);
        feedback.innerHTML = `
            <div class="feedback-message wrong"><i class="fas fa-times-circle"></i> ${t('copy_wrong_feedback')}</div>
            ${diff}
            <div class="feedback-actions">
                <button class="btn btn-secondary btn-intended" onclick="acceptIntendedStepCopy('${wordId}')">
                    <i class="fas fa-check"></i> ${t('i_meant_this_btn')}
                </button>
                <button class="btn btn-primary btn-next" onclick="showNextStepQuestion()">
                    <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
                </button>
            </div>
        `;
    }

    input.disabled = true;
    if (submitBtn) submitBtn.classList.add('hidden');
    focusNextButton();
    saveActiveSession();
}

function showStepHint(word, qa) {
    const content = document.getElementById('steps-content');
    const hintPattern = buildHintPattern(qa.answer);
    currentCheckContext = { wordId: word.id, correct: qa.answer };
    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label">
                <i class="fas fa-lightbulb"></i> ${t('hint_type_label')}
            </div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            <p class="setting-hint">Hint: ${escapeHtml(hintPattern)}</p>
            <div class="typing-input-container">
                <input type="text" class="typing-input" id="step-hint-input"
                       placeholder="${t('hint_input_placeholder')}" autofocus autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false"
                       onkeydown="if(event.key==='Enter'){ event.preventDefault(); event.stopPropagation(); checkStepHint('${word.id}', '${escapeHtml(qa.answer).replace(/&#39;/g, "\\&#39;")}'); }">
                ${getTremaHelperHtml('step-hint-input', qa.answerLang)}
                <button class="btn btn-primary typing-submit" id="step-hint-submit" onclick="checkStepHint('${word.id}', '${escapeHtml(qa.answer).replace(/&#39;/g, "\\&#39;")}')">
                    <i class="fas fa-check"></i> ${t('check_btn')}
                </button>
            </div>
            <div id="step-hint-feedback"></div>
        </div>
    `;
    document.getElementById('step-hint-submit').onclick = () => checkStepHint(currentCheckContext.wordId, currentCheckContext.correct);
    document.getElementById('step-hint-input').onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); checkStepHint(currentCheckContext.wordId, currentCheckContext.correct); } };
    setTimeout(() => document.getElementById('step-hint-input')?.focus(), 100);
}

function checkStepHint(wordId, correct) {
    const input = document.getElementById('step-hint-input');
    const feedback = document.getElementById('step-hint-feedback');
    const submitBtn = document.getElementById('step-hint-submit');
    if (!input || !feedback) return;

    const userAnswer = input.value;
    const isCorrect = checkAnswer(userAnswer, correct);
    input.classList.remove('correct', 'wrong');
    recordAnswer(wordId, isCorrect);

    if (isCorrect) {
        triggerHaptic('success');
        input.classList.add('correct');
        studySession.correctCount++;
        playCorrectSound();
        advanceLearnPhase(wordId);
        feedback.innerHTML = `
            <div class="feedback-message correct"><i class="fas fa-check-circle"></i> ${t('hint_correct_feedback')}</div>
            <button class="btn btn-primary btn-next" onclick="showNextStepQuestion()"><i class="fas fa-arrow-right"></i> ${t('next_question_btn')}</button>
        `;
    } else {
        triggerHaptic('heavy');
        input.classList.add('wrong');
        studySession.wrongCount++;
        studySession.stepsWrongWords.push(wordId);
        const diff = buildTypingDiff(userAnswer, correct);
        feedback.innerHTML = `
            <div class="feedback-message wrong"><i class="fas fa-times-circle"></i> ${t('hint_wrong_feedback')}</div>
            ${diff}
            <div class="feedback-actions">
                <button class="btn btn-secondary btn-intended" onclick="acceptIntendedStepHint('${wordId}')">
                    <i class="fas fa-check"></i> ${t('i_meant_this_btn')}
                </button>
                <button class="btn btn-primary btn-next" onclick="showNextStepQuestion()">
                    <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
                </button>
            </div>
        `;
    }

    input.disabled = true;
    if (submitBtn) submitBtn.classList.add('hidden');
    focusNextButton();
    saveActiveSession();
}

function showStepChoice(word, qa) {
    const list = wordLists.find(l => l.id === currentListId);
    const otherWords = list.words.filter(w => w.id !== word.id);
    const candidateStrings = otherWords.map(w => (qa.isTermToDef ? w.definition : w.term));
    const wrongOptions = pickSimilarWrongOptions(qa.answer, candidateStrings, 3);
    const options = shuffleArray([qa.answer, ...wrongOptions]);

    const content = document.getElementById('steps-content');
    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label">
                <i class="fas fa-list-ul"></i> ${t('choice_type_label')}
            </div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            <div class="choice-options">
                ${options.map((opt) => `
                    <button class="choice-btn" data-word-id="${word.id}" data-opt="${escapeHtml(opt)}" data-answer="${escapeHtml(qa.answer)}" onclick="checkStepChoice(this.getAttribute('data-word-id'), this, this.getAttribute('data-opt'), this.getAttribute('data-answer'))">
                        ${escapeHtml(opt)}
                    </button>
                `).join('')}
            </div>
            <div id="step-choice-feedback"></div>
        </div>
    `;
}

function checkStepChoice(wordId, btn, selected, correct) {
    const isCorrect = checkAnswer(selected, correct);
    const buttons = document.querySelectorAll('.choice-btn');
    const feedback = document.getElementById('step-choice-feedback');
    const examMode = isExamModeActive();

    buttons.forEach(b => {
        b.disabled = true;
        if (!examMode && checkAnswer(b.textContent.trim(), correct)) {
            b.classList.add('correct');
        }
    });

    pushPendingAnswer(wordId, selected, correct, isCorrect);

    if (isCorrect) {
        triggerHaptic('success');
        if (!examMode) {
            btn.classList.add('correct');
        }
        studySession.correctCount++;
        if (!examMode) {
            playCorrectSound();
        }
        advanceLearnPhase(wordId);
        if (feedback) {
            feedback.innerHTML = examMode
                ? `
                <button class="btn btn-primary btn-next" onclick="continueStepChoice()">
                    <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
                </button>
            `
                : `
                <div class="feedback-msg correct">
                    <i class="fas fa-check-circle"></i> ${t('choice_correct_feedback')}
                </div>
            `;
        }
    } else {
        triggerHaptic('heavy');
        if (!examMode) {
            btn.classList.add('wrong');
        }
        studySession.wrongCount++;
        studySession.stepsWrongWords.push(wordId);
        if (feedback) {
            feedback.innerHTML = `
                <button class="btn btn-primary btn-next" onclick="continueStepChoice()">
                    <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
                </button>
            `;
        }
    }

    recordAnswer(wordId, isCorrect);
    saveActiveSession();

    if (isCorrect && !examMode) {
        setTimeout(() => showNextStepQuestion(), 900);
    }
}

function continueStepChoice() {
    showNextStepQuestion();
}

function showStepTyping(word, qa) {
    const content = document.getElementById('steps-content');
    const hintUi = renderHintButton(word.id, qa.answer, 'step-typing-hint');
    currentCheckContext = { wordId: word.id, correct: qa.answer };
    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label">
                <i class="fas fa-keyboard"></i> ${t('typing_type_label')}
            </div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            <div class="typing-input-container">
                <input type="text" class="typing-input" id="step-typing-input"
                       placeholder="${t('typing_input_placeholder')}" autofocus autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false"
                       onkeydown="if(event.key==='Enter'){ event.preventDefault(); event.stopPropagation(); checkStepTyping('${word.id}', '${escapeHtml(qa.answer).replace(/&#39;/g, "\\&#39;")}'); }">
                ${getTremaHelperHtml('step-typing-input', qa.answerLang)}
                <button class="btn btn-primary typing-submit" id="step-typing-submit" onclick="checkStepTyping('${word.id}', '${escapeHtml(qa.answer).replace(/&#39;/g, "\\&#39;")}')">
                    <i class="fas fa-check"></i> ${t('check_btn')}
                </button>
            </div>
            ${hintUi}
            <div id="step-typing-feedback"></div>
        </div>
    `;

    document.getElementById('step-typing-submit').onclick = () => checkStepTyping(currentCheckContext.wordId, currentCheckContext.correct);
    document.getElementById('step-typing-input').onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); checkStepTyping(currentCheckContext.wordId, currentCheckContext.correct); } };
    setTimeout(() => document.getElementById('step-typing-input').focus(), 100);
}

function checkStepTyping(wordId, correct) {
    const input = document.getElementById('step-typing-input');
    const feedback = document.getElementById('step-typing-feedback');
    const submitBtn = document.getElementById('step-typing-submit');
    const userAnswer = input.value;
    const isCorrect = checkAnswer(userAnswer, correct);
    const progress = studySession.wordProgress[wordId];
    const examMode = isExamModeActive();

    input.classList.remove('correct', 'wrong');
    pushPendingAnswer(wordId, userAnswer, correct, isCorrect);

    recordAnswer(wordId, isCorrect);

    if (isCorrect) {
        triggerHaptic('success');
        if (!examMode) {
            input.classList.add('correct');
        }
        studySession.correctCount++;
        if (!examMode) {
            playCorrectSound();
        }
        if (progress.typingRemaining > 0) {
            progress.typingRemaining--;
        }

        if (progress.typingRemaining === 0) {
            advanceLearnPhase(wordId);
            updateStepsProgress();
            feedback.innerHTML = examMode ? `
                <div class="feedback-message">
                    <i class="fas fa-check"></i> ${t('answer_saved_feedback')}
                </div>
                <button class="btn btn-primary btn-next" onclick="continueStepTyping()">
                    <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
                </button>
            ` : `
                <div class="feedback-message correct">
                    <i class="fas fa-check-circle"></i> ${t('typing_correct_feedback')}
                </div>
                <button class="btn btn-primary btn-next" onclick="continueStepTyping()">
                    <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
                </button>
            `;
            input.disabled = true;
            if (submitBtn) {
                submitBtn.classList.add('hidden');
            }
            saveActiveSession();
            return;
        }

        progress.typingCooldown = Math.max(progress.typingCooldown, 3);
        feedback.innerHTML = examMode ? `
            <div class="feedback-message">
                <i class="fas fa-check"></i> ${t('answer_saved_feedback')}
            </div>
            <button class="btn btn-primary btn-next" onclick="continueStepTyping()">
                <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
            </button>
        ` : `
            <div class="feedback-message correct">
                <i class="fas fa-check-circle"></i> ${t('typing_partial_feedback', {count: progress.typingRemaining})}
            </div>
            <button class="btn btn-primary btn-next" onclick="continueStepTyping()">
                <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
            </button>
        `;
        input.value = '';
        input.disabled = true;
        if (submitBtn) {
            submitBtn.classList.add('hidden');
        }
        saveActiveSession();
        return;
    } else {
        triggerHaptic('heavy');
        if (!examMode) {
            input.classList.add('wrong');
        }
        studySession.wrongCount++;
        studySession.stepsWrongWords.push(wordId);
        progress.typingRemaining = 2;
        progress.typingCooldown = Math.max(progress.typingCooldown, 3);
        const diff = buildTypingDiff(userAnswer, correct);
        const relatedHint = buildRelatedWordHint(userAnswer, correct, wordId);
        if (feedback) {
            feedback.innerHTML = examMode ? `
                <div class="feedback-message">
                    <i class="fas fa-check"></i> ${t('answer_saved_feedback')}
                </div>
                <button class="btn btn-primary btn-next" onclick="continueStepTyping()">
                    <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
                </button>
            ` : `
                <div class="feedback-message wrong">
                    <i class="fas fa-times-circle"></i> ${t('typing_wrong_feedback')}
                </div>
                ${diff}
                ${relatedHint}
                <div class="feedback-actions">
                    <button class="btn btn-secondary btn-intended" onclick="acceptIntendedStepTyping('${wordId}')">
                        <i class="fas fa-check"></i> ${t('i_meant_this_btn')}
                    </button>
                    <button class="btn btn-primary btn-next" onclick="continueStepTyping()">
                        <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
                    </button>
                </div>
            `;
        }
        input.disabled = true;
        if (submitBtn) {
            submitBtn.classList.add('hidden');
        }
        focusNextButton();
        saveActiveSession();
    }
}

function continueStepTyping() {
    showNextStepQuestion();
}

function markWordLearned(wordId) {
    if (!studySession.learnedWords.includes(wordId)) {
        studySession.learnedWords.push(wordId);
    }
    if (studySession.wordProgress[wordId]) {
        studySession.wordProgress[wordId].phase = 'done';
        studySession.wordProgress[wordId].done = true;
    }
}

function startStepsReviewTyping() {
    studySession.stepsReviewMode = true;
    studySession.stepsReviewQueue = shuffleArray([...new Set(studySession.stepsWrongWords)]);
    studySession.stepsReviewIndex = 0;
    studySession.stepsReviewCorrectIds = [];
    studySession.stepsReviewUniqueCount = studySession.stepsReviewQueue.length;
    updateStepsProgress();
    showNextStepsReviewQuestion();
}

function showNextStepsReviewQuestion() {
    const correctIds = studySession.stepsReviewCorrectIds || [];
    const uniqueCount = studySession.stepsReviewUniqueCount || new Set(studySession.stepsWrongWords).size;

    if (correctIds.length >= uniqueCount) {
        showComplete();
        return;
    }

    if (studySession.stepsReviewIndex >= studySession.stepsReviewQueue.length) {
        showComplete();
        return;
    }

    const wordId = studySession.stepsReviewQueue[studySession.stepsReviewIndex];
    const word = studySession.words.find(w => w.id === wordId);
    if (!word) {
        studySession.stepsReviewIndex++;
        showNextStepsReviewQuestion();
        return;
    }

    const qa = getQuestion(word);
    const content = document.getElementById('steps-content');
    const hintUi = renderHintButton(word.id, qa.answer, 'step-review-hint');
    currentCheckContext = { wordId: word.id, correct: qa.answer };
    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label">
                <i class="fas fa-repeat"></i> ${t('review_type_label')}
            </div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            <div class="typing-input-container">
                <input type="text" class="typing-input" id="step-review-input"
                       placeholder="${t('typing_input_placeholder')}" autofocus autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false"
                       onkeydown="if(event.key==='Enter'){ event.preventDefault(); event.stopPropagation(); checkStepReviewTyping('${word.id}', '${escapeHtml(qa.answer).replace(/&#39;/g, "\\&#39;")}'); }">
                ${getTremaHelperHtml('step-review-input', qa.answerLang)}
                <button class="btn btn-primary typing-submit" id="step-review-submit" onclick="checkStepReviewTyping('${word.id}', '${escapeHtml(qa.answer).replace(/&#39;/g, "\\&#39;")}')">
                    <i class="fas fa-check"></i> ${t('check_btn')}
                </button>
            </div>
            ${hintUi}
            <div id="step-review-feedback"></div>
        </div>
    `;

    document.getElementById('step-review-submit').onclick = () => checkStepReviewTyping(currentCheckContext.wordId, currentCheckContext.correct);
    document.getElementById('step-review-input').onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); checkStepReviewTyping(currentCheckContext.wordId, currentCheckContext.correct); } };
    setTimeout(() => document.getElementById('step-review-input').focus(), 100);
}

function checkStepReviewTyping(wordId, correct) {
    const input = document.getElementById('step-review-input');
    const feedback = document.getElementById('step-review-feedback');
    const submitBtn = document.getElementById('step-review-submit');
    const userAnswer = input.value;
    const isCorrect = checkAnswer(userAnswer, correct);
    const examMode = isExamModeActive();

    input.classList.remove('correct', 'wrong');
    pushPendingAnswer(wordId, userAnswer, correct, isCorrect);

    recordAnswer(wordId, isCorrect);

    if (isCorrect) {
        if (!examMode) {
            input.classList.add('correct');
            playCorrectSound();
        }
        if (!studySession.stepsReviewCorrectIds) studySession.stepsReviewCorrectIds = [];
        if (!studySession.stepsReviewCorrectIds.includes(wordId)) {
            studySession.stepsReviewCorrectIds.push(wordId);
        }
        updateStepsProgress();
        feedback.innerHTML = examMode ? `
            <div class="feedback-message">
                <i class="fas fa-check"></i> ${t('answer_saved_feedback')}
            </div>
            <button class="btn btn-primary btn-next" onclick="continueStepReviewTyping()">
                <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
            </button>
        ` : `
            <div class="feedback-message correct">
                <i class="fas fa-check-circle"></i> Goed!
            </div>
            <button class="btn btn-primary btn-next" onclick="continueStepReviewTyping()">
                <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
            </button>
        `;
    } else {
        if (!examMode) {
            input.classList.add('wrong');
        }
        // Re-add to the end of the queue so it comes back
        studySession.stepsReviewQueue.push(wordId);
        const diff = buildTypingDiff(userAnswer, correct);
        const relatedHint = buildRelatedWordHint(userAnswer, correct, wordId);
        feedback.innerHTML = examMode ? `
            <div class="feedback-message">
                <i class="fas fa-check"></i> ${t('answer_saved_feedback')}
            </div>
            <button class="btn btn-primary btn-next" onclick="continueStepReviewTyping()">
                <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
            </button>
        ` : `
            <div class="feedback-message wrong">
                <i class="fas fa-times-circle"></i> Fout.
            </div>
            ${diff}
            ${relatedHint}
            <div class="feedback-actions">
                <button class="btn btn-secondary btn-intended" onclick="acceptIntendedStepReview('${wordId}')">
                    <i class="fas fa-check"></i> ${t('i_meant_this_btn')}
                </button>
                <button class="btn btn-primary btn-next" onclick="continueStepReviewTyping()">
                    <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
                </button>
            </div>
        `;
    }

    input.disabled = true;
    if (submitBtn) {
        submitBtn.classList.add('hidden');
    }
    focusNextButton();
    saveActiveSession();
}

function continueStepReviewTyping() {
    studySession.stepsReviewIndex++;
    updateStepsProgress();
    showNextStepsReviewQuestion();
}

// ===== TYPING MODE =====
function initTypingMode() {
    const list = wordLists.find(l => l.id === currentListId);

    const selectedWords = getStudyWordsFromSelection(list.words);
    if (!selectedWords.length) {
        alert('Geen woorden gevonden met je huidige selectie/filters.');
        showListDetail(currentListId);
        return;
    }
    studySession.words = shuffleArray([...selectedWords]);
    studySession.currentIndex = 0;
    studySession.typingProgress = {};
    
    studySession.words.forEach(word => {
        studySession.typingProgress[word.id] = {
            correctInARow: 0,
            needsExtraCorrect: 0,
            completed: false,
            cooldown: 0
        };
    });
    studySession.typingWrongWords = [];
    studySession.typingReviewMode = false;
    studySession.typingReviewQueue = [];
    studySession.typingReviewIndex = 0;
    
    showView('study-typing-view');
    startGhostTimer();
    updateTypingProgress();
    showNextTypingQuestion();
}

function updateTypingProgress() {
    const baseTotal = studySession.words.length;
    const reviewTotal = new Set(studySession.typingWrongWords || []).size;
    const total = baseTotal + (reviewTotal > 0 ? reviewTotal : 0);

    const completed = Object.values(studySession.typingProgress).filter(p => p.completed).length;
    const reviewDone = studySession.typingReviewMode ? (studySession.typingReviewCorrectIds || []).length : 0;
    const done = Math.min(total, completed + reviewDone);
    const percent = total > 0 ? (done / total) * 100 : 0;

    document.getElementById('typing-progress').style.width = `${percent}%`;
    document.getElementById('typing-progress-text').textContent = `${done}/${total}`;
}

function showNextTypingQuestion() {
    if (studySession.typingReviewMode) {
        showNextTypingReviewQuestion();
        return;
    }
    let nextWord = getNextTypingWord();

    if (!nextWord) {
        reduceTypingCooldowns();
        nextWord = getNextTypingWord();
    }

    if (!nextWord) {
        if (studySession.typingWrongWords && studySession.typingWrongWords.length > 0) {
            startTypingReview();
            return;
        }
        showComplete();
        return;
    }
    
    reduceTypingCooldowns();
    const qa = getQuestion(nextWord);
    const progress = studySession.typingProgress[nextWord.id];
    const extraHint = progress.needsExtraCorrect > 0 
        ? `<p class="extra-hint">${t('typing_extra_hint', {count: progress.needsExtraCorrect})}</p>` 
        : '';
    const hintUi = renderHintButton(nextWord.id, qa.answer, 'typing-hint-box');
    currentCheckContext = { wordId: nextWord.id, correct: qa.answer };
    const content = document.getElementById('typing-content');
    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label">
                <i class="fas fa-keyboard"></i> ${t('typing_type_label')}
            </div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            ${extraHint}
            <div class="typing-input-container">
                <input type="text" class="typing-input" id="typing-input" 
                       placeholder="${t('typing_input_placeholder')}" autofocus autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false"
                       onkeydown="if(event.key==='Enter'){ event.preventDefault(); event.stopPropagation(); checkTypingAnswer('${nextWord.id}', '${escapeHtml(qa.answer).replace(/&#39;/g, "\\&#39;")}'); }">
                ${getTremaHelperHtml('typing-input', qa.answerLang)}
                <button class="btn btn-primary typing-submit" id="typing-submit" onclick="checkTypingAnswer('${nextWord.id}', '${escapeHtml(qa.answer).replace(/&#39;/g, "\\&#39;")}')">
                    <i class="fas fa-check"></i> ${t('check_btn')}
                </button>
            </div>
            ${hintUi}
            <div id="typing-feedback"></div>
        </div>
    `;
    
    document.getElementById('typing-submit').onclick = () => checkTypingAnswer(currentCheckContext.wordId, currentCheckContext.correct);
    document.getElementById('typing-input').onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); checkTypingAnswer(currentCheckContext.wordId, currentCheckContext.correct); } };
    setTimeout(() => document.getElementById('typing-input').focus(), 100);
}

function checkTypingAnswer(wordId, correct) {
    const input = document.getElementById('typing-input');
    const feedback = document.getElementById('typing-feedback');
    const submitBtn = document.getElementById('typing-submit');
    const userAnswer = input.value;
    const isCorrect = checkAnswer(userAnswer, correct);
    const progress = studySession.typingProgress[wordId];
    const examMode = isExamModeActive();

    input.classList.remove('correct', 'wrong');
    pushPendingAnswer(wordId, userAnswer, correct, isCorrect);

    recordAnswer(wordId, isCorrect);

    if (isCorrect) {
        if (!examMode) {
            input.classList.add('correct');
        }
        studySession.correctCount++;
        if (!examMode) {
            playCorrectSound();
        }

        if (progress.needsExtraCorrect > 0) {
            progress.needsExtraCorrect--;
        }

        if (progress.needsExtraCorrect === 0) {
            progress.completed = true;
            feedback.innerHTML = examMode ? `
                <div class="feedback-message">
                    <i class="fas fa-check"></i> ${t('answer_saved_feedback')}
                </div>
                <button class="btn btn-primary btn-next" onclick="continueTyping()">
                    <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
                </button>
            ` : `
                <div class="feedback-message correct">
                    <i class="fas fa-check-circle"></i> ${t('typing_correct_feedback')}
                </div>
                <button class="btn btn-primary btn-next" onclick="continueTyping()">
                    <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
                </button>
            `;
            updateTypingProgress();
            input.disabled = true;
            if (submitBtn) {
                submitBtn.classList.add('hidden');
            }
            saveActiveSession();
            return;
        }

        progress.cooldown = Math.max(progress.cooldown, 3);
        feedback.innerHTML = examMode ? `
            <div class="feedback-message">
                <i class="fas fa-check"></i> ${t('answer_saved_feedback')}
            </div>
            <button class="btn btn-primary btn-next" onclick="continueTyping()">
                <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
            </button>
        ` : `
            <div class="feedback-message correct">
                <i class="fas fa-check-circle"></i> ${t('typing_partial_review', {count: progress.needsExtraCorrect})}
            </div>
            <button class="btn btn-primary btn-next" onclick="continueTyping()">
                <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
            </button>
        `;
        input.value = '';
        input.disabled = true;
        if (submitBtn) {
            submitBtn.classList.add('hidden');
        }
        saveActiveSession();
    } else {
        if (!examMode) {
            input.classList.add('wrong');
        }
        studySession.wrongCount++;
        progress.needsExtraCorrect = 2;
        // Bij kleine sets (<4 woorden), zorg dat foute woorden afwisselen door hogere cooldown
        const cooldownValue = studySession.words.length < 4 ? 8 : 4;
        progress.cooldown = Math.max(progress.cooldown, cooldownValue);
        if (!studySession.typingWrongWords.includes(wordId)) {
            studySession.typingWrongWords.push(wordId);
        }
        const diff = buildTypingDiff(userAnswer, correct);
        const relatedHint = buildRelatedWordHint(userAnswer, correct, wordId);
        feedback.innerHTML = examMode ? `
            <div class="feedback-message">
                <i class="fas fa-check"></i> ${t('answer_saved_feedback')}
            </div>
            <button class="btn btn-primary btn-next" onclick="continueTyping()">
                <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
            </button>
        ` : `
            <div class="feedback-message wrong">
                <i class="fas fa-times-circle"></i> Fout.
            </div>
            ${diff}
            ${relatedHint}
            <div class="feedback-actions">
                <button class="btn btn-secondary btn-intended" onclick="acceptIntendedTyping('${wordId}')">
                    <i class="fas fa-check"></i> ${t('i_meant_this_btn')}
                </button>
                <button class="btn btn-primary btn-next" onclick="continueTyping()">
                    <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
                </button>
            </div>
        `;
        input.disabled = true;
        if (submitBtn) {
            submitBtn.classList.add('hidden');
        }
        focusNextButton();
        saveActiveSession();
    }
}

function startTypingReview() {
    studySession.typingReviewMode = true;
    studySession.typingReviewQueue = shuffleArray([...new Set(studySession.typingWrongWords)]);
    studySession.typingReviewIndex = 0;
    studySession.typingReviewCorrectIds = [];
    studySession.typingReviewUniqueCount = studySession.typingReviewQueue.length;
    updateTypingProgress();
    showNextTypingReviewQuestion();
}

function showNextTypingReviewQuestion() {
    const correctIds = studySession.typingReviewCorrectIds || [];
    const uniqueCount = studySession.typingReviewUniqueCount || new Set(studySession.typingWrongWords).size;

    if (correctIds.length >= uniqueCount) {
        showComplete();
        return;
    }

    if (studySession.typingReviewIndex >= studySession.typingReviewQueue.length) {
        showComplete();
        return;
    }

    const wordId = studySession.typingReviewQueue[studySession.typingReviewIndex];
    const word = studySession.words.find(w => w.id === wordId);
    if (!word) {
        studySession.typingReviewIndex++;
        showNextTypingReviewQuestion();
        return;
    }

    const qa = getQuestion(word);
    const content = document.getElementById('typing-content');
    const hintUi = renderHintButton(word.id, qa.answer, 'typing-review-hint');
    currentCheckContext = { wordId: word.id, correct: qa.answer };
    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label">
                <i class="fas fa-repeat"></i> ${t('review_type_label')}
            </div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            <div class="typing-input-container">
                <input type="text" class="typing-input" id="typing-review-input" 
                       placeholder="${t('typing_input_placeholder')}" autofocus autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false"
                       onkeydown="if(event.key==='Enter'){ event.preventDefault(); event.stopPropagation(); checkTypingReview('${word.id}', '${escapeHtml(qa.answer).replace(/&#39;/g, "\\&#39;")}'); }">
                ${getTremaHelperHtml('typing-review-input', qa.answerLang)}
                <button class="btn btn-primary typing-submit" id="typing-review-submit" onclick="checkTypingReview('${word.id}', '${escapeHtml(qa.answer).replace(/&#39;/g, "\\&#39;")}')">
                    <i class="fas fa-check"></i> ${t('check_btn')}
                </button>
            </div>
            ${hintUi}
            <div id="typing-review-feedback"></div>
        </div>
    `;

    document.getElementById('typing-review-submit').onclick = () => checkTypingReview(currentCheckContext.wordId, currentCheckContext.correct);
    document.getElementById('typing-review-input').onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); checkTypingReview(currentCheckContext.wordId, currentCheckContext.correct); } };
    setTimeout(() => document.getElementById('typing-review-input').focus(), 100);
}

function checkTypingReview(wordId, correct) {
    const input = document.getElementById('typing-review-input');
    const feedback = document.getElementById('typing-review-feedback');
    const submitBtn = document.getElementById('typing-review-submit');
    const userAnswer = input.value;
    const isCorrect = checkAnswer(userAnswer, correct);
    const examMode = isExamModeActive();

    input.classList.remove('correct', 'wrong');
    pushPendingAnswer(wordId, userAnswer, correct, isCorrect);
    recordAnswer(wordId, isCorrect);

    if (isCorrect) {
        if (!examMode) {
            input.classList.add('correct');
            playCorrectSound();
        }
        if (!studySession.typingReviewCorrectIds) studySession.typingReviewCorrectIds = [];
        if (!studySession.typingReviewCorrectIds.includes(wordId)) {
            studySession.typingReviewCorrectIds.push(wordId);
        }
        updateTypingProgress();
        feedback.innerHTML = examMode ? `
            <div class="feedback-message">
                <i class="fas fa-check"></i> ${t('answer_saved_feedback')}
            </div>
            <button class="btn btn-primary btn-next" onclick="continueTypingReview()">
                <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
            </button>
        ` : `
            <div class="feedback-message correct">
                <i class="fas fa-check-circle"></i> Goed!
            </div>
            <button class="btn btn-primary btn-next" onclick="continueTypingReview()">
                <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
            </button>
        `;
    } else {
        if (!examMode) {
            input.classList.add('wrong');
        }
        // Re-add to the end of the queue so it comes back
        studySession.typingReviewQueue.push(wordId);
        const diff = buildTypingDiff(userAnswer, correct);
        const relatedHint = buildRelatedWordHint(userAnswer, correct, wordId);
        feedback.innerHTML = examMode ? `
            <div class="feedback-message">
                <i class="fas fa-check"></i> ${t('answer_saved_feedback')}
            </div>
            <button class="btn btn-primary btn-next" onclick="continueTypingReview()">
                <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
            </button>
        ` : `
            <div class="feedback-message wrong">
                <i class="fas fa-times-circle"></i> Fout.
            </div>
            ${diff}
            ${relatedHint}
            <div class="feedback-actions">
                <button class="btn btn-secondary btn-intended" onclick="acceptIntendedTypingReview('${wordId}')">
                    <i class="fas fa-check"></i> ${t('i_meant_this_btn')}
                </button>
                <button class="btn btn-primary btn-next" onclick="continueTypingReview()">
                    <i class="fas fa-arrow-right"></i> ${t('next_question_btn')}
                </button>
            </div>
        `;
    }

    input.disabled = true;
    if (submitBtn) {
        submitBtn.classList.add('hidden');
    }
    focusNextButton();
    saveActiveSession();
}

function continueTypingReview() {
    studySession.typingReviewIndex++;
    updateTypingProgress();
    showNextTypingReviewQuestion();
}

function continueTyping() {
    showNextTypingQuestion();
}

function getNextTypingWord() {
    const available = studySession.words.find(w => {
        const progress = studySession.typingProgress[w.id];
        return !progress.completed && progress.cooldown === 0;
    });
    if (available) return available;

    return studySession.words.find(w => {
        const progress = studySession.typingProgress[w.id];
        return !progress.completed;
    }) || null;
}

function reduceTypingCooldowns() {
    studySession.words.forEach(w => {
        const progress = studySession.typingProgress[w.id];
        if (progress.cooldown > 0) {
            progress.cooldown--;
        }
    });
}

// ===== TOETS MODE =====
function initExamMode() {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;

    const selectedWords = getStudyWordsFromSelection(list.words);
    if (!selectedWords.length) {
        alert('Geen woorden gevonden met je huidige selectie/filters.');
        showListDetail(currentListId);
        return;
    }

    studySession.words = shuffleArray([...selectedWords]);
    studySession.currentIndex = 0;
    studySession.pendingAnswers = [];

    showView('study-exam-view');
    updateExamProgress();
    showNextExamQuestion();
}

function updateExamProgress() {
    const total = studySession.words.length || 0;
    const done = Math.min(studySession.currentIndex, total);
    const percent = total > 0 ? (done / total) * 100 : 0;
    const bar = document.getElementById('exam-progress');
    const text = document.getElementById('exam-progress-text');
    if (bar) bar.style.width = `${percent}%`;
    if (text) text.textContent = `${done}/${total}`;
}

function showNextExamQuestion() {
    if (studySession.currentIndex >= studySession.words.length) {
        showComplete();
        return;
    }

    const word = studySession.words[studySession.currentIndex];
    const qa = getQuestion(word);
    const content = document.getElementById('exam-content');
    if (!content) return;

    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label"><i class="fas fa-clipboard-check"></i> ${t('exam_type_label')}</div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            <div class="typing-input-container">
                <input type="text" class="typing-input" id="exam-input"
                       placeholder="${t('typing_input_placeholder')}" autofocus autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false"
                       onkeydown="if(event.key==='Enter'){ event.preventDefault(); event.stopPropagation(); submitExamAnswer('${word.id}', '${escapeHtml(qa.answer).replace(/&#39;/g, "\\&#39;")}'); }">
                ${getTremaHelperHtml('exam-input', qa.answerLang)}
                <button class="btn btn-primary typing-submit" onclick="submitExamAnswer('${word.id}', '${escapeHtml(qa.answer).replace(/&#39;/g, "\\&#39;")}')">
                    <i class="fas fa-arrow-right"></i> ${t('exam_next_btn')}
                </button>
            </div>
            <p class="setting-hint">${t('exam_hint_text')}</p>
        </div>
    `;

    setTimeout(() => document.getElementById('exam-input')?.focus(), 100);
}

function submitExamAnswer(wordId, correct) {
    const input = document.getElementById('exam-input');
    if (!input) return;
    const userAnswer = input.value;
    const isCorrect = checkAnswer(userAnswer, correct);

    if (isCorrect) {
        studySession.correctCount++;
    } else {
        studySession.wrongCount++;
    }

    recordAnswer(wordId, isCorrect);
    pushPendingAnswer(wordId, userAnswer, correct, isCorrect);

    studySession.currentIndex++;
    updateExamProgress();
    saveActiveSession();
    showNextExamQuestion();
}

// ===== KOPPELRACE MODE =====
let connectState = {
    cards: [],
    matchedPairIds: [],
    selectedCardIds: [],
    totalPairs: 0,
    timeLeft: 0,
    timer: null,
    lockInput: false
};

function initConnectMode() {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;

    const selectedWords = getStudyWordsFromSelection(list.words);
    if (!selectedWords.length) {
        alert('Geen woorden gevonden met je huidige selectie/filters.');
        showListDetail(currentListId);
        return;
    }

    const words = shuffleArray([...selectedWords]).slice(0, Math.min(8, selectedWords.length));
    const cards = [];
    words.forEach(word => {
        cards.push({ cardId: `${word.id}-t`, pairId: word.id, label: word.term });
        cards.push({ cardId: `${word.id}-d`, pairId: word.id, label: word.definition });
    });

    connectState.cards = shuffleArray(cards);
    connectState.matchedPairIds = [];
    connectState.selectedCardIds = [];
    connectState.totalPairs = words.length;
    connectState.timeLeft = Math.max(45, words.length * 12);
    connectState.lockInput = false;
    connectState.wrongPairIds = []; // Track wrong pairs for animation

    studySession.correctCount = 0;
    studySession.wrongCount = 0;

    if (connectState.timer) clearInterval(connectState.timer);
    connectState.timer = setInterval(() => {
        connectState.timeLeft--;
        updateConnectHeader();
        if (connectState.timeLeft <= 0) {
            finishConnectMode(false);
        }
    }, 1000);

    showView('study-connect-view');
    updateConnectHeader();
    renderConnectBoard();
}

function updateConnectHeader() {
    const matched = connectState.matchedPairIds.length;
    const total = connectState.totalPairs || 0;
    const percent = total > 0 ? (matched / total) * 100 : 0;

    const bar = document.getElementById('connect-progress');
    const text = document.getElementById('connect-progress-text');
    const timer = document.getElementById('connect-timer');
    if (bar) bar.style.width = `${percent}%`;
    if (text) text.textContent = `${matched}/${total}`;
    if (timer) {
        const min = Math.floor(Math.max(connectState.timeLeft, 0) / 60);
        const sec = Math.max(connectState.timeLeft, 0) % 60;
        timer.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
        
        // Add warning class when time is running out
        if (connectState.timeLeft <= 10 && connectState.timeLeft > 0) {
            timer.classList.add('timer-warning');
        } else {
            timer.classList.remove('timer-warning');
        }
    }
}

function renderConnectBoard() {
    const container = document.getElementById('connect-content');
    if (!container) return;

    const selected = new Set(connectState.selectedCardIds);
    const matched = new Set(connectState.matchedPairIds);
    const wrong = new Set(connectState.wrongPairIds);

    container.innerHTML = `
        <div class="connect-board-container">
            <div class="connect-grid">
                ${connectState.cards.map(card => {
                    const isMatched = matched.has(card.pairId);
                    const isSelected = selected.has(card.cardId);
                    const isWrong = wrong.has(card.cardId);
                    
                    let classes = ['connect-card'];
                    if (isMatched) classes.push('matched');
                    if (isSelected) classes.push('selected');
                    if (isWrong) classes.push('wrong-shake');
                    
                    return `
                        <button class="${classes.join(' ')}" 
                                ${isMatched ? 'disabled' : ''}
                                onclick="pickConnectCard('${card.cardId}')">
                            <span class="connect-card-text">${escapeHtml(card.label)}</span>
                        </button>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function pickConnectCard(cardId) {
    if (connectState.lockInput) return;
    if (connectState.selectedCardIds.includes(cardId)) {
        // Deselect if clicked again
        triggerHaptic('light');
        connectState.selectedCardIds = connectState.selectedCardIds.filter(id => id !== cardId);
        renderConnectBoard();
        return;
    }

    const card = connectState.cards.find(c => c.cardId === cardId);
    if (!card) return;
    if (connectState.matchedPairIds.includes(card.pairId)) return;

    triggerHaptic('light');
    connectState.selectedCardIds.push(cardId);
    renderConnectBoard();

    if (connectState.selectedCardIds.length < 2) return;

    connectState.lockInput = true;
    const [firstId, secondId] = connectState.selectedCardIds;
    const first = connectState.cards.find(c => c.cardId === firstId);
    const second = connectState.cards.find(c => c.cardId === secondId);
    const isMatch = first && second && first.pairId === second.pairId;

    if (isMatch) {
        triggerHaptic('success');
        connectState.matchedPairIds.push(first.pairId);
        studySession.correctCount++;
        playCorrectSound();
        recordAnswer(first.pairId, true);
        
        // Add a small delay before removing matched cards for better visual feedback
        setTimeout(() => {
            connectState.selectedCardIds = [];
            connectState.lockInput = false;
            updateConnectHeader();

            if (connectState.matchedPairIds.length >= connectState.totalPairs) {
                finishConnectMode(true);
                return;
            }
            renderConnectBoard();
        }, 300);
    } else {
        triggerHaptic('heavy');
        studySession.wrongCount++;
        if (first) recordAnswer(first.pairId, false);
        if (second) recordAnswer(second.pairId, false);
        
        // Show wrong animation
        connectState.wrongPairIds = [firstId, secondId];
        renderConnectBoard();
        
        // Time penalty for wrong answer
        connectState.timeLeft = Math.max(0, connectState.timeLeft - 3);
        updateConnectHeader();
        showConnectPenalty();
        
        setTimeout(() => {
            connectState.wrongPairIds = [];
            connectState.selectedCardIds = [];
            connectState.lockInput = false;
            renderConnectBoard();
        }, 600);
    }
}

function finishConnectMode(won) {
    if (connectState.timer) {
        clearInterval(connectState.timer);
        connectState.timer = null;
    }

    document.getElementById('stat-correct').textContent = studySession.correctCount;
    document.getElementById('stat-wrong').textContent = studySession.wrongCount;

    const msg = won
        ? t('connect_win')
        : t('connect_lose');
    document.getElementById('complete-message').innerHTML = msg;
    document.getElementById('complete-summary').innerHTML =
        `<p class="summary-empty">${t('connect_pairs', {matched: connectState.matchedPairIds.length, total: connectState.totalPairs})}</p>`;

    if (won) {
        playCompleteSound();
        createConfetti();
    }

    showView('complete-view');
    clearActiveSession();

    // Force immediate progress sync for connect mode completion
    if (currentListId) {
        if (_progressSyncTimer) { clearTimeout(_progressSyncTimer); _progressSyncTimer = null; }
        syncProgressToRemote(currentListId);
    }
}

// ===== Utility Functions =====
function generateId() {
    if (crypto && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function escapeHtml(text) {
    if (text == null) return '';
    return String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ===== Woordkaartjes Mode =====
let cardsState = {
    currentIndex: 0,
    deck: [],
    correctCards: [],
    wrongCards: [],
    isFlipped: false
};

let cardSwipeState = {
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    isDragging: false,
    startTime: 0
};

function initCardsMode() {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;

    const words = getStudyWordsFromSelection(list.words);
    if (!words.length) {
        alert('Geen woorden gevonden met je huidige selectie/filters.');
        showListDetail(currentListId);
        return;
    }
    cardsState.deck = shuffleArray(words);
    cardsState.correctCards = [];
    cardsState.wrongCards = [];
    cardsState.currentIndex = 0;
    cardsState.isFlipped = false;

    studySession.correctCount = 0;
    studySession.wrongCount = 0;

    showView('study-cards-view');
    startGhostTimer();
    updateCardsProgress();
    showCurrentCard();

    // Keyboard shortcuts
    document.addEventListener('keydown', handleCardsKeys);

    // Setup swipe handlers
    setupCardSwipeHandlers();
}

function handleCardsKeys(e) {
    if (!document.getElementById('study-cards-view').classList.contains('active')) return;

    if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        flipCard();
    } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        markCard(true);
    } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        markCard(false);
    }
}

function showCurrentCard() {
    if (cardsState.currentIndex >= cardsState.deck.length) {
        // Check if we have wrong cards to review
        if (cardsState.wrongCards.length > 0) {
            showCardsReviewPrompt();
        } else {
            finalizeCardSession();
        }
        return;
    }

    const word = cardsState.deck[cardsState.currentIndex];
    const qa = getQuestion(word);
    cardsState.isFlipped = false;

    const content = document.getElementById('cards-content');
    content.innerHTML = `
        <div class="word-card" id="word-card" onclick="flipCard()">
            <div class="word-card-inner">
                <div class="word-card-face word-card-front">
                    <p>${escapeHtml(qa.question)}</p>
                </div>
                <div class="word-card-face word-card-back">
                    <p>${escapeHtml(qa.answer)}</p>
                </div>
            </div>
        </div>
        <p class="card-hint">${t('cards_swipe_hint')}</p>
        <div class="cards-actions" style="display: none;">
            <button class="card-action-btn card-action-wrong" onclick="markCard(false)">
                <i class="fas fa-times"></i> ${t('cards_wrong_btn')}
            </button>
            <button class="card-action-btn card-action-right" onclick="markCard(true)">
                <i class="fas fa-check"></i> ${t('cards_correct_btn')}
            </button>
        </div>
    `;

    updateCardsProgress();
}

function flipCard() {
    const card = document.getElementById('word-card');
    if (card) {
        card.classList.toggle('flipped');
        cardsState.isFlipped = !cardsState.isFlipped;

        // Show/hide buttons based on flip state
        const actions = document.querySelector('.cards-actions');
        if (actions) {
            if (cardsState.isFlipped) {
                actions.style.display = 'flex';
            } else {
                actions.style.display = 'none';
            }
        }
    }
}

function markCard(correct) {
    const word = cardsState.deck[cardsState.currentIndex];
    const card = document.getElementById('word-card');

    // Add fly out animation
    if (card) {
        card.classList.add(correct ? 'fly-out-right' : 'fly-out-left');
    }

    if (correct) {
        cardsState.correctCards.push(word);
        studySession.correctCount++;
        playCorrectSound();
    } else {
        cardsState.wrongCards.push(word);
        studySession.wrongCount++;
    }

    recordAnswer(word.id, correct);
    cardsState.currentIndex++;

    setTimeout(() => showCurrentCard(), 400);
}

function setupCardSwipeHandlers() {
    const container = document.getElementById('cards-content');
    if (!container) return;

    // Use pointer events for better cross-device support
    container.addEventListener('pointerdown', onCardPointerDown, { passive: false });
    container.addEventListener('pointermove', onCardPointerMove, { passive: false });
    container.addEventListener('pointerup', onCardPointerUp);
    container.addEventListener('pointercancel', onCardPointerCancel);
}

function onCardPointerDown(e) {
    const card = e.target.closest('.word-card');
    if (!card) return;

    cardSwipeState.isDragging = true;
    cardSwipeState.startX = e.clientX || e.touches?.[0]?.clientX || 0;
    cardSwipeState.startY = e.clientY || e.touches?.[0]?.clientY || 0;
    cardSwipeState.currentX = cardSwipeState.startX;
    cardSwipeState.currentY = cardSwipeState.startY;
    cardSwipeState.startTime = Date.now();

    card.style.transition = 'none';
}

function onCardPointerMove(e) {
    if (!cardSwipeState.isDragging) return;

    const card = document.getElementById('word-card');
    if (!card) return;

    cardSwipeState.currentX = e.clientX || e.touches?.[0]?.clientX || 0;
    cardSwipeState.currentY = e.clientY || e.touches?.[0]?.clientY || 0;

    const deltaX = cardSwipeState.currentX - cardSwipeState.startX;
    const deltaY = cardSwipeState.currentY - cardSwipeState.startY;

    // Only drag if horizontal movement is dominant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        e.preventDefault();

        const rotate = deltaX / 20;
        const opacity = 1 - Math.abs(deltaX) / 300;

        card.style.transform = `translateX(${deltaX}px) rotate(${rotate}deg)`;
        card.style.opacity = Math.max(0.3, opacity);

        // Visual feedback
        const container = document.getElementById('study-cards-view');
        if (deltaX < -50) {
            container.classList.add('swipe-hint-left');
            container.classList.remove('swipe-hint-right');
        } else if (deltaX > 50) {
            container.classList.add('swipe-hint-right');
            container.classList.remove('swipe-hint-left');
        } else {
            container.classList.remove('swipe-hint-left', 'swipe-hint-right');
        }
    }
}

function onCardPointerUp(e) {
    if (!cardSwipeState.isDragging) return;

    cardSwipeState.isDragging = false;

    const card = document.getElementById('word-card');
    const container = document.getElementById('study-cards-view');
    if (!card) return;

    const deltaX = cardSwipeState.currentX - cardSwipeState.startX;
    const deltaTime = Date.now() - cardSwipeState.startTime;
    const velocity = Math.abs(deltaX) / deltaTime;

    container.classList.remove('swipe-hint-left', 'swipe-hint-right');

    // Check if swipe threshold met
    const swipeThreshold = 80;
    const velocityThreshold = 0.5;

    if (Math.abs(deltaX) > swipeThreshold || velocity > velocityThreshold) {
        // Swipe successful - mark card
        if (deltaX > 0) {
            markCard(true); // Swipe right = correct
        } else {
            markCard(false); // Swipe left = wrong
        }
    } else {
        // Reset card position
        card.style.transition = 'all 0.3s ease';
        card.style.transform = '';
        card.style.opacity = '';

        setTimeout(() => {
            card.style.transition = '';
        }, 300);
    }
}

function onCardPointerCancel(e) {
    if (!cardSwipeState.isDragging) return;

    cardSwipeState.isDragging = false;

    const card = document.getElementById('word-card');
    const container = document.getElementById('study-cards-view');

    if (card) {
        card.style.transition = 'all 0.3s ease';
        card.style.transform = '';
        card.style.opacity = '';
    }

    if (container) {
        container.classList.remove('swipe-hint-left', 'swipe-hint-right');
    }
}

function updateCardsProgress() {
    const total = cardsState.deck.length;
    const current = cardsState.currentIndex + 1;
    const percent = total > 0 ? (cardsState.currentIndex / total) * 100 : 0;

    const progressBar = document.getElementById('cards-progress');
    if (progressBar) {
        progressBar.style.width = `${percent}%`;
    }

    const progressText = document.getElementById('cards-progress-text');
    if (progressText) {
        progressText.textContent = `${Math.min(current, total)}/${total}`;
    }
}

function showCardsReviewPrompt() {
    const content = document.getElementById('cards-content');
    content.innerHTML = `
        <div class="question-card">
            <h3>${t('cards_review_title')}</h3>
            <p style="margin: 1rem 0; color: var(--text-medium);">
                ${t('cards_review_desc', {count: cardsState.wrongCards.length, s: cardsState.wrongCards.length !== 1 ? 's' : ''})}
            </p>
            <div class="cards-actions" style="flex-direction: column;">
                <button class="btn btn-primary" onclick="retryWrongCards()">
                    <i class="fas fa-redo"></i> ${t('cards_review_yes')}
                </button>
                <button class="btn btn-secondary" onclick="finalizeCardSession()">
                    <i class="fas fa-check"></i> ${t('cards_review_no')}
                </button>
            </div>
        </div>
    `;
}

function retryWrongCards() {
    cardsState.deck = shuffleArray([...cardsState.wrongCards]);
    cardsState.wrongCards = [];
    cardsState.currentIndex = 0;
    cardsState.isFlipped = false;
    showCurrentCard();
}

function finalizeCardSession() {
    cleanupCardHandlers();
    finalizeSessionStats();

    // Update last studied timestamp
    if (currentListId) {
        const list = wordLists.find(l => l.id === currentListId);
        if (list) {
            list.lastStudied = Date.now();
            saveData();
        }
    }

    document.getElementById('stat-correct').textContent = studySession.correctCount;
    document.getElementById('stat-wrong').textContent = studySession.wrongCount;

    const accuracy = studySession.correctCount + studySession.wrongCount > 0
        ? Math.round((studySession.correctCount / (studySession.correctCount + studySession.wrongCount)) * 100)
        : 100;

    const effectiveCorrect = Math.max(0, studySession.correctCount - (studySession.hintPenalty || 0));
    const grade = calculateGrade(effectiveCorrect, studySession.wrongCount);
    const gradeValue = parseFloat(grade);
    let gradeClass = 'grade-mid';
    if (gradeValue < 5.5) {
        gradeClass = 'grade-low';
    } else if (gradeValue > 8) {
        gradeClass = 'grade-high';
    }

    const hintPart = studySession.hintPenalty > 0
        ? t('hint_penalty', {count: studySession.hintPenalty.toFixed(1)})
        : '';
    document.getElementById('complete-message').innerHTML =
        t('complete_accuracy', {pct: accuracy, gradeClass, grade, hintPart});

    triggerHaptic('complete');
    playCompleteSound();
    createConfetti();
    showView('complete-view');
    clearActiveSession();

    // Force immediate progress sync for card session completion
    if (currentListId) {
        if (_progressSyncTimer) { clearTimeout(_progressSyncTimer); _progressSyncTimer = null; }
        syncProgressToRemote(currentListId);
    }
}

function showComplete() {
    triggerHaptic('complete');
    finalizeSessionStats();

    // Update last studied timestamp
    if (currentListId) {
        const list = wordLists.find(l => l.id === currentListId);
        if (list) {
            list.lastStudied = Date.now();
            saveData();
        }
    }

    document.getElementById('stat-correct').textContent = studySession.correctCount;
    document.getElementById('stat-wrong').textContent = studySession.wrongCount;

    const accuracy = studySession.correctCount + studySession.wrongCount > 0
        ? Math.round((studySession.correctCount / (studySession.correctCount + studySession.wrongCount)) * 100)
        : 100;

    const effectiveCorrect = Math.max(0, studySession.correctCount - (studySession.hintPenalty || 0));
    const grade = calculateGrade(effectiveCorrect, studySession.wrongCount);
    const gradeValue = parseFloat(grade);
    let gradeClass = 'grade-mid';
    if (gradeValue < 5.5) {
        gradeClass = 'grade-low';
    } else if (gradeValue > 8) {
        gradeClass = 'grade-high';
    }

    const hintPart = studySession.hintPenalty > 0
        ? t('hint_penalty', {count: studySession.hintPenalty.toFixed(1)})
        : '';
    document.getElementById('complete-message').innerHTML =
        t('complete_accuracy', {pct: accuracy, gradeClass, grade, hintPart});

    playCompleteSound();
    createConfetti();
    showView('complete-view');
    clearActiveSession();

    // Force immediate progress sync to Supabase on study completion
    if (currentListId) {
        if (_progressSyncTimer) { clearTimeout(_progressSyncTimer); _progressSyncTimer = null; }
        syncProgressToRemote(currentListId);
    }
}

function cleanupCardHandlers() {
    document.removeEventListener('keydown', handleCardsKeys);

    const container = document.getElementById('cards-content');
    if (container) {
        container.removeEventListener('pointerdown', onCardPointerDown);
        container.removeEventListener('pointermove', onCardPointerMove);
        container.removeEventListener('pointerup', onCardPointerUp);
        container.removeEventListener('pointercancel', onCardPointerCancel);
    }
}

function exitStudy() {
    // Cleanup cards mode handlers if in cards mode
    if (currentStudyMode === 'cards') {
        cleanupCardHandlers();
    }

    if (currentStudyMode === 'connect' && connectState.timer) {
        clearInterval(connectState.timer);
        connectState.timer = null;
    }

    // Keep session saved so user can resume later (don't clear it)

    // Return to list detail view
    if (currentListId) {
        showListDetail(currentListId);
    } else {
        showHome();
    }
}

function restartStudy() {
    if (currentListId && currentStudyMode) {
        startStudyMode(currentStudyMode);
    } else {
        showHome();
    }
}

function restoreLastView() {
    // PRIORITY 1: URL hash takes precedence (supports multi-tab)
    const route = parseHash();
    if (route.view !== 'home') {
        _hashNavigating = true;
        try {
            handleHashChange();
        } finally {
            _hashNavigating = false;
        }
        return;
    }

    // PRIORITY 2: Fall back to localStorage-based restore
    const lastView = localStorage.getItem(LAST_VIEW_KEY);
    const lastListId = localStorage.getItem(LAST_LIST_ID_KEY);
    const lastStudyMode = localStorage.getItem(LAST_STUDY_MODE_KEY);

    // Only restore if we have valid data
    if (!lastView || lastView === 'home-view' || lastView === 'create-view' || lastView === 'complete-view') {
        return; // Show default home view
    }

    // For study views, try to restore session from localStorage
    if (lastView.startsWith('study-')) {
        const raw = localStorage.getItem('activeStudySession');
        if (raw) {
            try {
                const data = JSON.parse(raw);
                if (data && data.state && data.state.words && data.state.words.length > 0) {
                    studySession = data.state;
                    currentStudyMode = data.mode;
                    currentListId = data.listId;

                    switch (currentStudyMode) {
                        case 'steps':
                            showView('study-steps-view');
                            updateStepsProgress();
                            if (studySession.stepsReviewMode) {
                                showNextStepsReviewQuestion();
                            } else {
                                showNextStepQuestion();
                            }
                            return;
                        case 'typing':
                            showView('study-typing-view');
                            updateTypingProgress();
                            if (studySession.typingReviewMode) {
                                showNextTypingReviewQuestion();
                            } else {
                                showNextTypingQuestion();
                            }
                            return;
                        case 'exam':
                            showView('study-exam-view');
                            updateExamProgress();
                            showNextExamQuestion();
                            return;
                        case 'cards':
                            // Cards mode can't be easily restored mid-session, show list instead
                            if (data.listId) {
                                const list = wordLists.find(l => l.id === data.listId);
                                if (list) {
                                    showListDetail(data.listId);
                                    return;
                                }
                            }
                            return;
                    }
                }
            } catch (e) {
                console.error('Failed to restore study session:', e);
                localStorage.removeItem('activeStudySession');
            }
        }
        return; // Session ended, show home
    }

    // For list view, restore the list if it exists
    if (lastView === 'list-view' && lastListId) {
        const list = wordLists.find(l => l.id === lastListId);
        if (list) {
            showListDetail(lastListId);
            return;
        }
    }
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    ensureAllWordMetadata();
    saveData();
    renderWordLists();

    applyTheme();
    applyCloudState();

    const colorPicker = document.getElementById('accent-color-picker');
    const colorInput = document.getElementById('accent-color-input');
    if (colorPicker && colorInput) {
        const syncAccentInputs = (value, save = false) => {
            const normalized = normalizeHexColor(value) || getAccentColor();
            colorPicker.value = normalized;
            colorInput.value = normalized;
            applyAccentColor(normalized);
            if (save) {
                setAccentColor(normalized);
                renderPresetColors();
            }
        };

        colorPicker.addEventListener('input', (e) => syncAccentInputs(e.target.value, true));
        colorInput.addEventListener('change', (e) => syncAccentInputs(e.target.value, true));
    }
    
    // Setup language search filters
    setupLanguageSearch();

    // Setup keyboard controls
    setupKeyboardControls();

    // Apply import from URL if present
    applyImportFromUrl();

    // Close auth menu when clicking outside
    document.addEventListener('click', (event) => {
        const menu = document.getElementById('auth-menu');
        const btn = document.getElementById('auth-menu-btn');
        if (!menu || !btn) return;
        if (menu.classList.contains('hidden')) return;
        if (menu.contains(event.target) || btn.contains(event.target)) return;
        closeAuthMenu();
    });

    // Restore last view (session persistence)
    restoreLastView();

    // Listen for hash changes (back/forward navigation, multi-tab)
    window.addEventListener('hashchange', handleHashChange);
});

function applyImportFromUrl() {
    const params = new URLSearchParams(window.location.search);

    // Nieuwe methode: korte share-link via Supabase
    const shareId = params.get('share');
    if (shareId) {
        // Zorg ervoor dat Supabase beschikbaar is voor share links,
        // zelfs als cloud niet is ingeschakeld door de gebruiker
        let client = supabaseClient;
        if (!client && window.supabase) {
            try {
                const SUPABASE_URL = 'https://sngiduythwiuthrtzmch.supabase.co';
                const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZ2lkdXl0aHdpdXRocnR6bWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNDY5MzUsImV4cCI6MjA4NTYyMjkzNX0.xNecbmT6VRPPhBVnW5WQv-QdJp4o2MDZq4tV-jsJXLI';
                if (window.__loek_supabase_client) {
                    client = window.__loek_supabase_client;
                } else {
                    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
                    window.__loek_supabase_client = client;
                }
            } catch (e) {
                console.warn('Supabase init voor share link mislukt:', e);
            }
        }
        if (!client) {
            showToast('Kan deellink niet laden. Probeer de pagina opnieuw te laden.', 'error');
            return;
        }
        client
            .from('shares')
            .select('data')
            .eq('id', shareId)
            .single()
            .then(({ data, error }) => {
                if (error || !data) {
                    console.error('Share ophalen mislukt:', error);
                    alert('Deze deellink is ongeldig of verlopen.');
                    return;
                }
                const s = data.data;
                showCreateList();
                if (s.title) document.getElementById('list-title').value = s.title;
                setSelectValue('lang-from', s.langFrom);
                setSelectValue('lang-to', s.langTo);
                const fromSearch = document.getElementById('lang-from-search');
                const toSearch = document.getElementById('lang-to-search');
                if (fromSearch && s.langFrom) fromSearch.value = s.langFrom;
                if (toSearch && s.langTo) toSearch.value = s.langTo;
                const wordsList = document.getElementById('words-list');
                wordsList.innerHTML = '';
                if (!s.words || s.words.length === 0) { addWordEntry(); return; }
                s.words.forEach(w => addWordEntry(w.term, w.definition));
                window.history.replaceState({}, document.title, window.location.pathname);
            });
        return;
    }

    // Legacy methode: import via query-params
    if (params.get('import') !== '1') return;

    const title = params.get('title') ? decodeURIComponent(params.get('title')) : '';
    const langFrom = params.get('langFrom') ? decodeURIComponent(params.get('langFrom')) : '';
    const langTo = params.get('langTo') ? decodeURIComponent(params.get('langTo')) : '';
    const dataRaw = params.get('data') ? decodeURIComponent(params.get('data')) : '';

    showCreateList();

    if (title) {
        document.getElementById('list-title').value = title;
    }

    setSelectValue('lang-from', langFrom);
    setSelectValue('lang-to', langTo);

    // Update search inputs
    const fromSearch = document.getElementById('lang-from-search');
    const toSearch = document.getElementById('lang-to-search');
    if (fromSearch && langFrom) fromSearch.value = langFrom;
    if (toSearch && langTo) toSearch.value = langTo;

    const wordsList = document.getElementById('words-list');
    wordsList.innerHTML = '';

    const pairs = dataRaw.split('\n').map(line => line.split('\t')).filter(p => p.length >= 2);
    if (pairs.length === 0) {
        addWordEntry();
        return;
    }

    pairs.forEach(([term, definition]) => {
        addWordEntry(term.trim(), definition.trim());
    });

    // Clean URL
    window.history.replaceState({}, document.title, window.location.pathname);
}

function setSelectValue(selectId, value) {
    const select = document.getElementById(selectId);
    if (!select) return;

    const options = Array.from(select.options);
    const match = options.find(o => o.textContent.toLowerCase() === (value || '').toLowerCase());
    if (match) {
        select.value = match.textContent;
    }
}

function setupKeyboardControls() {
    document.addEventListener('keydown', (e) => {
        const settingsModal = document.getElementById('settings-modal');
        if (settingsModal && !settingsModal.classList.contains('hidden')) return;

        const stepsView = document.getElementById('study-steps-view');
        const typingView = document.getElementById('study-typing-view');
        const cardsView = document.getElementById('study-cards-view');
        const examView = document.getElementById('study-exam-view');
        const connectView = document.getElementById('study-connect-view');
        const inStudyView =
            (stepsView && stepsView.classList.contains('active')) ||
            (typingView && typingView.classList.contains('active')) ||
            (cardsView && cardsView.classList.contains('active')) ||
            (examView && examView.classList.contains('active')) ||
            (connectView && connectView.classList.contains('active'));

        if (!inStudyView) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            exitStudy();
            return;
        }

        if (e.ctrlKey && (e.key === 'h' || e.key === 'H')) {
            e.preventDefault();
            triggerCurrentHint();
            return;
        }

        const activeElement = document.activeElement;
        const isTypingField = activeElement && ['INPUT', 'TEXTAREA'].includes(activeElement.tagName) && !activeElement.disabled;
        if (isTypingField) return;

        if (stepsView && stepsView.classList.contains('active')) {
            handleStepsKeyboard(e);
        }

        if (typingView && typingView.classList.contains('active')) {
            handleTypingKeyboard(e);
        }
    });
}

function triggerCurrentHint() {
    return;
}

function handleStepsKeyboard(e) {
    const choiceButtons = document.querySelectorAll('.choice-options .choice-btn');
    if (choiceButtons.length > 0) {
        const index = getNumberKeyIndex(e);
        if (index !== null && choiceButtons[index]) {
            e.preventDefault();
            choiceButtons[index].click();
            return;
        }

        const choiceNextBtn = document.querySelector('#step-choice-feedback .btn-next');
        if (choiceNextBtn && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            choiceNextBtn.click();
            return;
        }
    }

    const flashCard = document.getElementById('step-flash-card');
    const flashNextBtn = document.getElementById('step-flash-next');
    if (flashCard) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (!flashCard.classList.contains('flipped')) {
                flipStepFlash();
            } else if (flashNextBtn && flashNextBtn.style.display !== 'none') {
                flashNextBtn.click();
            }
            return;
        }
    }

    const typingInput = document.getElementById('step-typing-input');
    const typingContinueBtn = document.querySelector('#step-typing-feedback .btn-next');
    if (typingInput && typingInput.disabled && typingContinueBtn && e.key === 'Enter') {
        e.preventDefault();
        typingContinueBtn.click();
    }

    const reviewInput = document.getElementById('step-review-input');
    const reviewContinueBtn = document.querySelector('#step-review-feedback .btn-next');
    if (reviewInput && reviewInput.disabled && reviewContinueBtn && e.key === 'Enter') {
        e.preventDefault();
        reviewContinueBtn.click();
    }
}

function handleTypingKeyboard(e) {
    const typingInput = document.getElementById('typing-input');
    const typingContinueBtn = document.querySelector('#typing-feedback .btn-next');
    if (typingInput && typingInput.disabled && typingContinueBtn && e.key === 'Enter') {
        e.preventDefault();
        typingContinueBtn.click();
    }

    const reviewInput = document.getElementById('typing-review-input');
    const reviewContinueBtn = document.querySelector('#typing-review-feedback .btn-next');
    if (reviewInput && reviewInput.disabled && reviewContinueBtn && e.key === 'Enter') {
        e.preventDefault();
        reviewContinueBtn.click();
    }
}

function getNumberKeyIndex(e) {
    const keyMap = {
        'Digit1': 0,
        'Digit2': 1,
        'Digit3': 2,
        'Digit4': 3,
        'Numpad1': 0,
        'Numpad2': 1,
        'Numpad3': 2,
        'Numpad4': 3
    };
    return keyMap[e.code] ?? null;
}

function setupLanguageSearch() {
    const langFromSearch = document.getElementById('lang-from-search');
    const langToSearch = document.getElementById('lang-to-search');
    const langFromSelect = document.getElementById('lang-from');
    const langToSelect = document.getElementById('lang-to');

    if (langFromSearch && langFromSelect) {
        langFromSearch.addEventListener('input', (e) => {
            filterLanguageSelect(e.target.value, langFromSelect);
        });
    }

    if (langToSearch && langToSelect) {
        langToSearch.addEventListener('input', (e) => {
            filterLanguageSelect(e.target.value, langToSelect);
        });
    }
}

function getSubjectLanguageLabel() {
    const subject = document.getElementById('selected-subject')?.value || '';
    const map = {
        nederlands: 'Nederlands',
        engels: 'Engels',
        frans: 'Frans',
        duits: 'Duits',
        spaans: 'Spaans',
        italiaans: 'Italiaans',
        latijn: 'Latijn',
        grieks: 'Grieks'
    };
    return map[subject] || null;
}

function applyLanguageSubjectFilter(selectElement) {
    const subjectLang = getSubjectLanguageLabel();
    const options = selectElement.querySelectorAll('option');
    const allowed = subjectLang ? ['nederlands', subjectLang.toLowerCase()] : null;

    options.forEach(option => {
        if (option.value === '') {
            option.style.display = 'block';
            return;
        }

        if (!allowed) {
            option.style.display = 'block';
            return;
        }

        const text = option.textContent.toLowerCase();
        option.style.display = allowed.includes(text) ? 'block' : 'none';
    });

    if (subjectLang) {
        const current = (selectElement.value || '').toLowerCase();
        const target = selectElement.id === 'lang-from'
            ? subjectLang
            : (subjectLang.toLowerCase() === 'nederlands' ? 'Nederlands' : 'Nederlands');
        if (current && !allowed.includes(current)) {
            selectElement.value = target;
        }
    }
}

function filterLanguageSelect(searchTerm, selectElement) {
    const options = selectElement.querySelectorAll('option');
    const term = (searchTerm || '').toLowerCase().trim();

    if (!term) {
        applyLanguageSubjectFilter(selectElement);
        return;
    }

    options.forEach(option => {
        if (option.value === '') {
            option.style.display = 'block';
            return;
        }

        const text = option.textContent.toLowerCase();
        if (text.includes(term)) {
            option.style.display = 'block';
        } else {
            option.style.display = 'none';
        }
    });
}

function buildTypingDiff(userAnswer, correctAnswer) {
    const user = normalizeAnswer(userAnswer, false, studySession.ignoreParentheses, studySession.ignorePunctuation);
    const correct = normalizeAnswer(correctAnswer, false, studySession.ignoreParentheses, studySession.ignorePunctuation);

    if (!user.length && !correct.length) {
        return `
            <div class="correct-answer-display">
                <div>${t('diff_both_empty')}</div>
                <div>${t('diff_correct_empty')}</div>
            </div>
        `;
    }

    if (!user.length) {
        return `
            <div class="typing-diff">
                <div class="diff-row">
                    <span class="diff-label">${t('diff_you_label')}</span>
                    <span class="diff-text"><span class="diff-char missing">${t('diff_you_empty')}</span></span>
                </div>
                <div class="diff-row">
                    <span class="diff-label">${t('diff_correct_label')}</span>
                    <span class="diff-text"><span class="diff-char expected">${escapeHtml(correct)}</span></span>
                </div>
            </div>
        `;
    }

    // Use character-level diff on the entire string for better alignment of spaces and punctuation
    const diff = charLevelDiff(user, correct);

    return `
        <div class="typing-diff">
            <div class="diff-row">
                <span class="diff-label">${t('diff_you_label')}</span>
                <span class="diff-text">${diff.userHtml}</span>
            </div>
            <div class="diff-row">
                <span class="diff-label">${t('diff_correct_label')}</span>
                <span class="diff-text">${diff.correctHtml}</span>
            </div>
        </div>
    `;
}

function alignWords(userWords, correctWords) {
    const m = userWords.length;
    const n = correctWords.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (userWords[i - 1].toLowerCase() === correctWords[j - 1].toLowerCase()) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // Partial match gets lower cost than complete mismatch
                const similarity = wordSimilarity(userWords[i - 1], correctWords[j - 1]);
                const replaceCost = similarity > 0.5 ? 0.5 : 1;
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,
                    dp[i][j - 1] + 1,
                    dp[i - 1][j - 1] + replaceCost
                );
            }
        }
    }

    // Traceback
    const ops = [];
    let i = m, j = n;
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0) {
            const isEqual = userWords[i - 1].toLowerCase() === correctWords[j - 1].toLowerCase();
            const similarity = wordSimilarity(userWords[i - 1], correctWords[j - 1]);
            const replaceCost = isEqual ? 0 : (similarity > 0.5 ? 0.5 : 1);

            if (dp[i][j] === dp[i - 1][j - 1] + replaceCost) {
                if (isEqual) {
                    ops.push({ type: 'equal', userWord: userWords[i - 1], correctWord: correctWords[j - 1] });
                } else {
                    ops.push({ type: 'replace', userWord: userWords[i - 1], correctWord: correctWords[j - 1] });
                }
                i--; j--;
                continue;
            }
        }
        if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
            ops.push({ type: 'delete', userWord: userWords[i - 1] });
            i--;
            continue;
        }
        if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
            ops.push({ type: 'insert', correctWord: correctWords[j - 1] });
            j--;
            continue;
        }
        break;
    }

    return ops.reverse();
}

function wordSimilarity(a, b) {
    if (!a || !b) return 0;
    const la = a.toLowerCase();
    const lb = b.toLowerCase();
    if (la === lb) return 1;
    const maxLen = Math.max(la.length, lb.length);
    if (maxLen === 0) return 1;
    const dist = levenshteinDistanceWithTranspose(la, lb);
    return 1 - dist / maxLen;
}

function levenshteinDistanceWithTranspose(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
            // Handle transpositions (adjacent char swap)
            if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
                dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
            }
        }
    }
    return dp[m][n];
}

function charLevelDiff(userWord, correctWord) {
    const uChars = Array.from(userWord);
    const cChars = Array.from(correctWord);
    const m = uChars.length;
    const n = cChars.length;

    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // Case-insensitive and accent-tolerant comparison
            const uChar = uChars[i - 1];
            const cChar = cChars[j - 1];
            const cost = charsMatch(uChar, cChar) ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost
            );
            // Transposition
            if (i > 1 && j > 1 && charsMatch(uChars[i - 1], cChars[j - 2]) && charsMatch(uChars[i - 2], cChars[j - 1])) {
                dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
            }
        }
    }

    // Traceback
    const userParts = [];
    const correctParts = [];
    let i = m, j = n;

    while (i > 0 || j > 0) {
        if (i > 0 && j > 0) {
            const cost = charsMatch(uChars[i - 1], cChars[j - 1]) ? 0 : 1;
            if (dp[i][j] === dp[i - 1][j - 1] + cost) {
                if (cost === 0) {
                    userParts.push(`<span class="diff-char correct">${escapeHtml(uChars[i - 1])}</span>`);
                    correctParts.push(`<span class="diff-char correct">${escapeHtml(cChars[j - 1])}</span>`);
                } else {
                    userParts.push(`<span class="diff-char wrong">${escapeHtml(uChars[i - 1])}</span>`);
                    correctParts.push(`<span class="diff-char expected">${escapeHtml(cChars[j - 1])}</span>`);
                }
                i--; j--;
                continue;
            }
            // Check transposition
            if (i > 1 && j > 1 && charsMatch(uChars[i - 1], cChars[j - 2]) && charsMatch(uChars[i - 2], cChars[j - 1]) && dp[i][j] === dp[i - 2][j - 2] + 1) {
                userParts.push(`<span class="diff-char wrong">${escapeHtml(uChars[i - 1])}</span>`);
                userParts.push(`<span class="diff-char wrong">${escapeHtml(uChars[i - 2])}</span>`);
                correctParts.push(`<span class="diff-char expected">${escapeHtml(cChars[j - 1])}</span>`);
                correctParts.push(`<span class="diff-char expected">${escapeHtml(cChars[j - 2])}</span>`);
                i -= 2; j -= 2;
                continue;
            }
        }
        if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
            userParts.push(`<span class="diff-char wrong">${escapeHtml(uChars[i - 1])}</span>`);
            correctParts.push(`<span class="diff-char expected">_</span>`);
            i--;
            continue;
        }
        if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
            userParts.push(`<span class="diff-char missing">_</span>`);
            correctParts.push(`<span class="diff-char expected">${escapeHtml(cChars[j - 1])}</span>`);
            j--;
            continue;
        }
        break;
    }

    return {
        userHtml: userParts.reverse().join(''),
        correctHtml: correctParts.reverse().join('')
    };
}

function charsMatch(a, b) {
    if (a === b) return true;
    // Case insensitive
    if (a.toLowerCase() === b.toLowerCase()) return true;
    // Accent-tolerant: normalize and compare
    const na = a.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const nb = b.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return na === nb;
}

function recordAnswer(wordId, isCorrect) {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;

    const word = list.words.find(w => w.id === wordId);
    if (!word) return;

    ensureWordMetadata(word);

    if (isCorrect) {
        word.stats.correct += 1;
    } else {
        word.stats.wrong += 1;
    }

    applyHintPenaltyIfNeeded(wordId, isCorrect);

    studySession.sessionResults[wordId] = studySession.sessionResults[wordId] || { correct: 0, wrong: 0 };
    if (isCorrect) {
        studySession.sessionResults[wordId].correct += 1;
    } else {
        studySession.sessionResults[wordId].wrong += 1;
    }

    saveData();

    // Debounced sync to Supabase (every 3s during practice)
    if (currentListId) debouncedSyncProgress(currentListId);
}

function overrideAnswerToCorrect(wordId, { skipSessionCounters = false } = {}) {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;

    const word = list.words.find(w => w.id === wordId);
    if (!word) return;

    if (!word.stats) {
        word.stats = { correct: 0, wrong: 0 };
    }

    if (word.stats.wrong > 0) {
        word.stats.wrong -= 1;
    }
    word.stats.correct += 1;

    studySession.sessionResults[wordId] = studySession.sessionResults[wordId] || { correct: 0, wrong: 0 };
    if (studySession.sessionResults[wordId].wrong > 0) {
        studySession.sessionResults[wordId].wrong -= 1;
    }
    studySession.sessionResults[wordId].correct += 1;

    if (!skipSessionCounters) {
        if (studySession.wrongCount > 0) {
            studySession.wrongCount -= 1;
        }
        studySession.correctCount += 1;
    }

    // Apply hint penalty just like a normal correct answer would
    applyHintPenaltyIfNeeded(wordId, true);

    saveData();
}

function removeLastOccurrence(arr, value) {
    const idx = arr.lastIndexOf(value);
    if (idx !== -1) arr.splice(idx, 1);
}

function acceptIntendedStepCopy(wordId) {
    overrideAnswerToCorrect(wordId);
    triggerHaptic('success');
    playCorrectSound();
    removeLastOccurrence(studySession.stepsWrongWords, wordId);
    advanceLearnPhase(wordId);
    updateStepsProgress();
    saveActiveSession();
    showNextStepQuestion();
}

function acceptIntendedStepHint(wordId) {
    overrideAnswerToCorrect(wordId);
    triggerHaptic('success');
    playCorrectSound();
    removeLastOccurrence(studySession.stepsWrongWords, wordId);
    advanceLearnPhase(wordId);
    updateStepsProgress();
    saveActiveSession();
    showNextStepQuestion();
}

function acceptIntendedStepTyping(wordId) {
    overrideAnswerToCorrect(wordId);
    triggerHaptic('success');
    playCorrectSound();
    // Remove only the last occurrence (the one just added by this wrong answer)
    removeLastOccurrence(studySession.stepsWrongWords, wordId);
    const progress = studySession.wordProgress[wordId];
    if (progress) {
        // Mark typing as fully done — no re-typing required
        progress.typingRemaining = 0;
        advanceLearnPhase(wordId);
        updateStepsProgress();
    }
    saveActiveSession();
    showNextStepQuestion();
}

function acceptIntendedTyping(wordId) {
    overrideAnswerToCorrect(wordId);
    triggerHaptic('success');
    playCorrectSound();
    const progress = studySession.typingProgress[wordId];
    if (progress) {
        // Mark fully completed — no extra typing required
        progress.needsExtraCorrect = 0;
        progress.completed = true;
        updateTypingProgress();
    }
    // Remove from typingWrongWords entirely
    studySession.typingWrongWords = studySession.typingWrongWords.filter(id => id !== wordId);
    saveActiveSession();
    showNextTypingQuestion();
}

function acceptIntendedTypingReview(wordId) {
    overrideAnswerToCorrect(wordId, { skipSessionCounters: true });
    triggerHaptic('success');
    playCorrectSound();
    // Remove the re-added entry from the end of the queue
    const lastIdx = studySession.typingReviewQueue.lastIndexOf(wordId);
    if (lastIdx > studySession.typingReviewIndex) {
        studySession.typingReviewQueue.splice(lastIdx, 1);
    }
    if (!studySession.typingReviewCorrectIds) studySession.typingReviewCorrectIds = [];
    if (!studySession.typingReviewCorrectIds.includes(wordId)) {
        studySession.typingReviewCorrectIds.push(wordId);
    }
    updateTypingProgress();
    saveActiveSession();
    continueTypingReview();
}

function acceptIntendedStepReview(wordId) {
    overrideAnswerToCorrect(wordId, { skipSessionCounters: true });
    triggerHaptic('success');
    playCorrectSound();
    // Remove the re-added entry from the end of the queue
    const lastIdx = studySession.stepsReviewQueue.lastIndexOf(wordId);
    if (lastIdx > studySession.stepsReviewIndex) {
        studySession.stepsReviewQueue.splice(lastIdx, 1);
    }
    if (!studySession.stepsReviewCorrectIds) studySession.stepsReviewCorrectIds = [];
    if (!studySession.stepsReviewCorrectIds.includes(wordId)) {
        studySession.stepsReviewCorrectIds.push(wordId);
    }
    updateStepsProgress();
    saveActiveSession();
    continueStepReviewTyping();
}

function calculateGrade(correct, wrong) {
    const total = correct + wrong;
    if (total === 0) return '10.0';
    const accuracy = correct / total;
    const grade = 1 + accuracy * 9;
    return grade.toFixed(1);
}

function finalizeSessionStats() {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;
    const summary = document.getElementById('complete-summary');
    if (!summary) return;

    if (isExamModeActive()) {
        const examRows = renderExamSummary();
        summary.innerHTML = examRows || `<p class="summary-empty">${t('no_answers')}</p>`;
        return;
    }

    const wordsById = list.words.reduce((acc, w) => {
        acc[w.id] = w;
        return acc;
    }, {});

    const rows = Object.entries(studySession.sessionResults).map(([wordId, stats]) => {
        const word = wordsById[wordId];
        if (!word) return '';
        return `
            <div class="summary-row">
                <span class="summary-term">${escapeHtml(word.term)}</span>
                <span class="summary-def">${escapeHtml(word.definition)}</span>
                <span class="summary-stats">${t('stat_correct_summary', {correct: stats.correct, wrong: stats.wrong})}</span>
            </div>
        `;
    }).join('');

    summary.innerHTML = rows || `<p class="summary-empty">${t('no_answers')}</p>`;
}

function saveActiveSession() {
    if (!currentListId || !currentStudyMode) return;
    const payload = {
        listId: currentListId,
        mode: currentStudyMode,
        state: studySession,
        savedAt: new Date().toISOString()
    };
    localStorage.setItem('activeStudySession', JSON.stringify(payload));
}

function clearActiveSession() {
    localStorage.removeItem('activeStudySession');
}

function updateResumeBanner() {
    const banner = document.getElementById('resume-banner');
    const text = document.getElementById('resume-text');
    if (!banner || !text) return;

    const raw = localStorage.getItem('activeStudySession');
    if (!raw) {
        banner.classList.add('hidden');
        return;
    }

    const data = JSON.parse(raw);
    if (!data || data.listId !== currentListId) {
        banner.classList.add('hidden');
        return;
    }

    banner.classList.remove('hidden');
    text.textContent = t('resume_banner_text', {mode: data.mode});
}

function resumeStudy() {
    const raw = localStorage.getItem('activeStudySession');
    if (!raw) return;
    const data = JSON.parse(raw);
    if (!data || data.listId !== currentListId) return;

    studySession = data.state;
    currentStudyMode = data.mode;

    closeSettingsModal();

    switch (currentStudyMode) {
        case 'steps':
            showView('study-steps-view');
            updateStepsProgress();
            if (studySession.stepsReviewMode) {
                showNextStepsReviewQuestion();
            } else {
                showNextStepQuestion();
            }
            break;
        case 'typing':
            showView('study-typing-view');
            updateTypingProgress();
            if (studySession.typingReviewMode) {
                showNextTypingReviewQuestion();
            } else {
                showNextTypingQuestion();
            }
            break;
        case 'exam':
            showView('study-exam-view');
            updateExamProgress();
            showNextExamQuestion();
            break;
    }
}

// ===== Feedback System =====
const FEEDBACK_COOLDOWN_KEY = 'lastFeedbackSubmit';
const FEEDBACK_COOLDOWN_MS = 60000; // 1 minuut cooldown tussen inzendingen

function openFeedbackModal() {
    const modal = document.getElementById('feedback-modal');
    if (!modal) return;
    // Reset form
    document.getElementById('feedback-subject').value = '';
    document.getElementById('feedback-description').value = '';
    document.getElementById('feedback-email').value = authUser?.email || '';
    document.getElementById('feedback-type').value = 'feature';
    document.getElementById('feedback-char-count').textContent = '0';
    document.getElementById('feedback-error').classList.add('hidden');
    document.getElementById('feedback-success').classList.add('hidden');
    document.getElementById('feedback-submit-btn').disabled = false;
    // Reset type buttons
    document.querySelectorAll('.feedback-type-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === 'feature');
    });
    modal.classList.remove('hidden');
    triggerHaptic('light');
}

function closeFeedbackModal() {
    const modal = document.getElementById('feedback-modal');
    if (modal) modal.classList.add('hidden');
}

function selectFeedbackType(type) {
    document.getElementById('feedback-type').value = type;
    document.querySelectorAll('.feedback-type-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === type);
    });
    // Update placeholder op basis van type
    const subjectInput = document.getElementById('feedback-subject');
    const descInput = document.getElementById('feedback-description');
    if (type === 'bug') {
        subjectInput.placeholder = 'Bijv. App crasht bij openen lijst';
        descInput.placeholder = 'Beschrijf de bug: wat deed je, wat verwachtte je, en wat gebeurde er?\n\nStappen om te reproduceren:\n1. ...\n2. ...\n3. ...';
    } else {
        subjectInput.placeholder = 'Bijv. Dark mode toevoegen';
        descInput.placeholder = 'Beschrijf je idee zo duidelijk mogelijk...';
    }
    triggerHaptic('light');
}

// Character counter voor beschrijving
document.addEventListener('DOMContentLoaded', function() {
    const desc = document.getElementById('feedback-description');
    const counter = document.getElementById('feedback-char-count');
    if (desc && counter) {
        desc.addEventListener('input', () => {
            counter.textContent = desc.value.length;
        });
    }
});

function sanitizeFeedbackInput(str) {
    if (!str) return '';
    // Strip HTML tags en trim
    return str.replace(/<[^>]*>/g, '').trim();
}

async function submitFeedback() {
    const errorEl = document.getElementById('feedback-error');
    const successEl = document.getElementById('feedback-success');
    const submitBtn = document.getElementById('feedback-submit-btn');
    errorEl.classList.add('hidden');
    successEl.classList.add('hidden');

    const type = document.getElementById('feedback-type').value;
    const subject = sanitizeFeedbackInput(document.getElementById('feedback-subject').value);
    const description = sanitizeFeedbackInput(document.getElementById('feedback-description').value);
    const email = document.getElementById('feedback-email').value.trim();

    // Validatie
    if (!subject || subject.length < 3) {
        errorEl.textContent = t('feedback_err_subject');
        errorEl.classList.remove('hidden');
        return;
    }
    if (!description || description.length < 10) {
        errorEl.textContent = t('feedback_err_desc');
        errorEl.classList.remove('hidden');
        return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorEl.textContent = t('feedback_err_email');
        errorEl.classList.remove('hidden');
        return;
    }

    // Rate limiting (client-side)
    const lastSubmit = parseInt(localStorage.getItem(FEEDBACK_COOLDOWN_KEY) || '0', 10);
    if (Date.now() - lastSubmit < FEEDBACK_COOLDOWN_MS) {
        const secondsLeft = Math.ceil((FEEDBACK_COOLDOWN_MS - (Date.now() - lastSubmit)) / 1000);
        errorEl.textContent = t('feedback_rate_limit', {sec: secondsLeft});
        errorEl.classList.remove('hidden');
        return;
    }

    // Check of Supabase beschikbaar is
    if (!supabaseClient) {
        // Probeer Supabase te initialiseren als dat nog niet is gebeurd
        if (window.supabase) {
            const SUPABASE_URL = 'https://sngiduythwiuthrtzmch.supabase.co';
            const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZ2lkdXl0aHdpdXRocnR6bWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNDY5MzUsImV4cCI6MjA4NTYyMjkzNX0.xNecbmT6VRPPhBVnW5WQv-QdJp4o2MDZq4tV-jsJXLI';
            if (!window.__loek_supabase_client) {
                window.__loek_supabase_client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            }
            supabaseClient = window.__loek_supabase_client;
        }
    }

    if (!supabaseClient) {
        errorEl.textContent = t('feedback_no_client');
        errorEl.classList.remove('hidden');
        return;
    }

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${t('feedback_submitting_btn')}`;

    try {
        const payload = {
            type,
            subject: subject.slice(0, 150),
            description: description.slice(0, 2000),
            email: email || null,
            user_id: authUser?.id || null,
            user_agent: navigator.userAgent.slice(0, 500)
        };

        const { error } = await supabaseClient
            .from('feedback')
            .insert([payload]);

        if (error) {
            console.error('Feedback submit error:', error);
            errorEl.textContent = t('feedback_err_send');
            errorEl.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> ${t('feedback_send_btn')}`;
            return;
        }

        // Succes!
        localStorage.setItem(FEEDBACK_COOLDOWN_KEY, Date.now().toString());
        successEl.textContent = t('feedback_success_msg');
        successEl.classList.remove('hidden');
        triggerHaptic('success');

        // Sluit modal na 2 seconden
        setTimeout(() => {
            closeFeedbackModal();
        }, 2000);

    } catch (err) {
        console.error('Feedback submit exception:', err);
        errorEl.textContent = t('feedback_generic_err');
        errorEl.classList.remove('hidden');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> ${t('feedback_send_btn')}`;
    }
}

// =====================================================
// ===== TOAST NOTIFICATION SYSTEM =====
// =====================================================
function showToast(message, type = 'info', duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) { console.warn('Toast:', message); return; }

    const iconMap = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${iconMap[type] || iconMap.info}"></i>
        <span class="toast-text">${escapeHtml(message)}</span>
        <button class="toast-close" onclick="this.parentElement.classList.add('removing'); setTimeout(()=>this.parentElement.remove(),300)" aria-label="Sluiten">&times;</button>
    `;
    container.appendChild(toast);
    const autoRemove = setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, duration);
    toast.querySelector('.toast-close').addEventListener('click', () => clearTimeout(autoRemove));
}

// ===== CUSTOM CONFIRM DIALOG =====
function showConfirm(title, message = '') {
    return new Promise(resolve => {
        const overlay = document.getElementById('confirm-dialog');
        const titleEl = document.getElementById('confirm-title');
        const msgEl = document.getElementById('confirm-message');
        const okBtn = document.getElementById('confirm-ok');
        const cancelBtn = document.getElementById('confirm-cancel');
        if (!overlay) { resolve(confirm(title)); return; }

        titleEl.textContent = title;
        msgEl.textContent = message;
        msgEl.style.display = message ? '' : 'none';
        overlay.classList.remove('hidden');

        function cleanup(result) {
            overlay.classList.add('hidden');
            okBtn.removeEventListener('click', onOk);
            cancelBtn.removeEventListener('click', onCancel);
            overlay.removeEventListener('click', onOverlay);
            document.removeEventListener('keydown', onKey);
            resolve(result);
        }
        function onOk() { cleanup(true); }
        function onCancel() { cleanup(false); }
        function onOverlay(e) { if (e.target === overlay) cleanup(false); }
        function onKey(e) { if (e.key === 'Escape') cleanup(false); if (e.key === 'Enter') cleanup(true); }

        okBtn.addEventListener('click', onOk);
        cancelBtn.addEventListener('click', onCancel);
        overlay.addEventListener('click', onOverlay);
        document.addEventListener('keydown', onKey);
        cancelBtn.focus();
    });
}

// =====================================================
// ===== GAMIFICATION SYSTEM (Streaks, XP, Daily Goals, Achievements) =====
// =====================================================
const GAMIFICATION_KEY = 'gamificationData';
const DAILY_GOAL_WORDS = 20; // default daily goal

function getGamificationData() {
    try {
        return JSON.parse(localStorage.getItem(GAMIFICATION_KEY)) || createDefaultGamificationData();
    } catch { return createDefaultGamificationData(); }
}

function createDefaultGamificationData() {
    return {
        streak: 0,
        longestStreak: 0,
        lastStudyDate: null,
        totalXp: 0,
        totalCorrect: 0,
        totalWrong: 0,
        totalSessions: 0,
        dailyGoal: DAILY_GOAL_WORDS,
        todayWords: 0,
        todayDate: null,
        weeklyActivity: {}, // { 'YYYY-MM-DD': wordsCount }
        achievements: [],
        sessionHistory: [] // last 50 sessions: { date, mode, correct, wrong, xp }
    };
}

function saveGamificationData(data) {
    try { localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(data)); } catch (e) { console.error('Gamification save failed', e); }
}

function getTodayStr() {
    return new Date().toISOString().split('T')[0];
}

function updateStreak(data) {
    const today = getTodayStr();
    if (data.lastStudyDate === today) return; // already updated today

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (data.lastStudyDate === yesterdayStr) {
        data.streak++;
    } else if (data.lastStudyDate !== today) {
        data.streak = 1; // reset
    }
    data.longestStreak = Math.max(data.longestStreak, data.streak);
    data.lastStudyDate = today;
}

function awardXp(correct, wrong, mode) {
    const data = getGamificationData();
    const today = getTodayStr();

    // Reset daily counter if new day
    if (data.todayDate !== today) {
        data.todayWords = 0;
        data.todayDate = today;
    }

    // XP calculation
    let xp = correct * 10;
    if (mode === 'typing' || mode === 'exam') xp = correct * 15; // harder modes give more
    if (mode === 'connect') xp = correct * 12;

    // Streak bonus
    if (data.streak >= 7) xp = Math.round(xp * 1.5);
    else if (data.streak >= 3) xp = Math.round(xp * 1.2);

    data.totalXp += xp;
    data.totalCorrect += correct;
    data.totalWrong += wrong;
    data.totalSessions++;
    data.todayWords += correct;

    // Weekly activity
    if (!data.weeklyActivity) data.weeklyActivity = {};
    data.weeklyActivity[today] = (data.weeklyActivity[today] || 0) + correct;

    // Clean old activity data (keep only last 14 days)
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 14);
    for (const dateStr of Object.keys(data.weeklyActivity)) {
        if (new Date(dateStr) < cutoff) delete data.weeklyActivity[dateStr];
    }

    // Session history (keep last 50)
    if (!data.sessionHistory) data.sessionHistory = [];
    data.sessionHistory.push({ date: today, mode, correct, wrong, xp });
    if (data.sessionHistory.length > 50) data.sessionHistory = data.sessionHistory.slice(-50);

    updateStreak(data);
    checkAchievements(data);
    saveGamificationData(data);
    updateGamificationUI(data);

    // Show XP toast
    if (xp > 0) {
        showToast(`+${xp} XP verdiend!`, 'success', 2500);
    }

    return xp;
}

function checkAchievements(data) {
    if (!data.achievements) data.achievements = [];
    const earned = new Set(data.achievements);

    const checks = [
        { id: 'first_session', condition: data.totalSessions >= 1 },
        { id: 'streak_3', condition: data.streak >= 3 },
        { id: 'streak_7', condition: data.streak >= 7 },
        { id: 'streak_30', condition: data.streak >= 30 },
        { id: 'xp_100', condition: data.totalXp >= 100 },
        { id: 'xp_1000', condition: data.totalXp >= 1000 },
        { id: 'xp_5000', condition: data.totalXp >= 5000 },
        { id: 'correct_50', condition: data.totalCorrect >= 50 },
        { id: 'correct_500', condition: data.totalCorrect >= 500 },
        { id: 'correct_2000', condition: data.totalCorrect >= 2000 },
        { id: 'sessions_10', condition: data.totalSessions >= 10 },
        { id: 'sessions_50', condition: data.totalSessions >= 50 },
        { id: 'daily_goal', condition: data.todayWords >= data.dailyGoal },
    ];

    for (const { id, condition } of checks) {
        if (condition && !earned.has(id)) {
            data.achievements.push(id);
            const meta = ACHIEVEMENT_META[id];
            if (meta) {
                showToast(`Prestatie ontgrendeld: ${meta.name}`, 'success', 4000);
            }
        }
    }
}

const ACHIEVEMENT_META = {
    first_session: { name: 'Eerste Stappen', desc: 'Voltooi je eerste oefensessie', icon: 'fa-bullseye' },
    streak_3: { name: '3 Dagen Op Rij', desc: 'Leer 3 dagen achter elkaar', icon: 'fa-fire' },
    streak_7: { name: 'Weekstrijder', desc: 'Leer 7 dagen achter elkaar', icon: 'fa-dumbbell' },
    streak_30: { name: 'Maandmonster', desc: 'Leer 30 dagen achter elkaar', icon: 'fa-medal' },
    xp_100: { name: 'XP Beginner', desc: 'Verdien 100 XP', icon: 'fa-star' },
    xp_1000: { name: 'XP Pro', desc: 'Verdien 1.000 XP', icon: 'fa-star-half-stroke' },
    xp_5000: { name: 'XP Legende', desc: 'Verdien 5.000 XP', icon: 'fa-wand-magic-sparkles' },
    correct_50: { name: '50 Goed', desc: '50 woorden correct beantwoord', icon: 'fa-circle-check' },
    correct_500: { name: '500 Goed', desc: '500 woorden correct beantwoord', icon: 'fa-graduation-cap' },
    correct_2000: { name: 'Woordenmeester', desc: '2.000 woorden correct beantwoord', icon: 'fa-crown' },
    sessions_10: { name: '10 Sessies', desc: 'Voltooi 10 oefensessies', icon: 'fa-book-open' },
    sessions_50: { name: '50 Sessies', desc: 'Voltooi 50 oefensessies', icon: 'fa-trophy' },
    daily_goal: { name: 'Dagdoel Gehaald!', desc: 'Bereik je dagelijkse doel', icon: 'fa-bullseye' },
};

function updateGamificationUI(data) {
    if (!data) data = getGamificationData();
    const bar = document.getElementById('gamification-bar');
    if (bar) bar.classList.remove('hidden');

    const streakEl = document.getElementById('streak-count');
    const xpEl = document.getElementById('xp-count');
    const goalEl = document.getElementById('daily-goal-progress');
    const goalFill = document.getElementById('daily-goal-fill');

    if (streakEl) streakEl.textContent = data.streak || 0;
    if (xpEl) xpEl.textContent = data.totalXp || 0;

    const today = getTodayStr();
    const todayWords = data.todayDate === today ? (data.todayWords || 0) : 0;
    const goal = data.dailyGoal || DAILY_GOAL_WORDS;
    if (goalEl) goalEl.textContent = `${Math.min(todayWords, goal)}/${goal}`;
    if (goalFill) goalFill.style.width = `${Math.min(100, (todayWords / goal) * 100)}%`;
}

// =====================================================
// ===== STATISTICS VIEW =====
// =====================================================
function showStatsView() {
    showView('stats-view');
    renderStatsView();
}

function renderStatsView() {
    const data = getGamificationData();

    // Overview stats
    const streakEl = document.getElementById('stats-streak');
    const xpEl = document.getElementById('stats-total-xp');
    const correctEl = document.getElementById('stats-total-correct');
    const sessionsEl = document.getElementById('stats-total-sessions');

    if (streakEl) streakEl.textContent = data.streak || 0;
    if (xpEl) xpEl.textContent = data.totalXp || 0;
    if (correctEl) correctEl.textContent = data.totalCorrect || 0;
    if (sessionsEl) sessionsEl.textContent = data.totalSessions || 0;

    // Activity Chart (last 7 days)
    const chartEl = document.getElementById('stats-activity-chart');
    if (chartEl) {
        const days = [];
        const dayNames = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];
        let maxVal = 1;

        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const count = (data.weeklyActivity && data.weeklyActivity[dateStr]) || 0;
            maxVal = Math.max(maxVal, count);
            days.push({ label: dayNames[d.getDay()], count, dateStr });
        }

        chartEl.innerHTML = days.map(day => {
            const heightPct = Math.max(4, (day.count / maxVal) * 100);
            return `
                <div class="activity-day" title="${day.count} woorden op ${day.dateStr}">
                    <div class="activity-bar" style="height: ${heightPct}%"></div>
                    <span class="activity-label">${day.label}</span>
                </div>
            `;
        }).join('');
    }

    // Achievements
    const achEl = document.getElementById('stats-achievements');
    if (achEl) {
        const earned = new Set(data.achievements || []);
        achEl.innerHTML = Object.entries(ACHIEVEMENT_META).map(([id, meta]) => {
            const unlocked = earned.has(id);
            return `
                <div class="achievement-badge ${unlocked ? '' : 'locked'}" title="${meta.desc}">
                    <div class="achievement-icon"><i class="fas ${meta.icon}"></i></div>
                    <span class="achievement-name">${meta.name}</span>
                    <span class="achievement-desc">${meta.desc}</span>
                </div>
            `;
        }).join('');
    }
}

// =====================================================
// ===== TEXT-TO-SPEECH =====
// =====================================================
function speakText(text, lang) {
    if (!('speechSynthesis' in window)) {
        showToast('Tekst-naar-spraak wordt niet ondersteund in je browser.', 'warning');
        return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);

    // Map app language codes to BCP-47
    const langMap = {
        'nl': 'nl-NL', 'en': 'en-US', 'de': 'de-DE', 'fr': 'fr-FR',
        'es': 'es-ES', 'it': 'it-IT', 'pt': 'pt-PT', 'ru': 'ru-RU',
        'zh': 'zh-CN', 'ja': 'ja-JP', 'ko': 'ko-KR', 'ar': 'ar-SA',
        'tr': 'tr-TR', 'pl': 'pl-PL', 'sv': 'sv-SE', 'da': 'da-DK',
        'no': 'nb-NO', 'fi': 'fi-FI', 'el': 'el-GR', 'cs': 'cs-CZ',
        'ro': 'ro-RO', 'hu': 'hu-HU', 'id': 'id-ID', 'th': 'th-TH',
    };
    utter.lang = langMap[lang] || lang || 'nl-NL';
    utter.rate = 0.9;
    utter.pitch = 1;

    window.speechSynthesis.speak(utter);
}

function getTtsButton(text, lang) {
    return `<button class="tts-btn" onclick="speakText('${escapeHtml(text).replace(/&#39;/g, "\\&#39;")}', '${lang || ''}')" title="Uitspreken" aria-label="Uitspreken"><i class="fas fa-volume-up"></i></button>`;
}

// =====================================================
// ===== OFFLINE DETECTION =====
// =====================================================
function initOfflineDetection() {
    const banner = document.getElementById('offline-banner');
    if (!banner) return;

    function updateStatus() {
        if (navigator.onLine) {
            banner.classList.add('hidden');
        } else {
            banner.classList.remove('hidden');
        }
    }
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    updateStatus();
}

// =====================================================
// ===== INSTALL PROMPT =====
// =====================================================
let deferredInstallPrompt = null;
const INSTALL_DISMISSED_KEY = 'installPromptDismissed';

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;

    // Don't show if user already dismissed
    const dismissed = localStorage.getItem(INSTALL_DISMISSED_KEY);
    if (dismissed && Date.now() - parseInt(dismissed) < 7 * 24 * 60 * 60 * 1000) return; // 7 days

    const prompt = document.getElementById('install-prompt');
    if (prompt) prompt.classList.remove('hidden');
});

window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    const prompt = document.getElementById('install-prompt');
    if (prompt) prompt.classList.add('hidden');
    showToast('Loek it Up is geïnstalleerd!', 'success');
});

function installApp() {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then(choice => {
        if (choice.outcome === 'accepted') {
            showToast('Bedankt voor het installeren!', 'success');
        }
        deferredInstallPrompt = null;
        const prompt = document.getElementById('install-prompt');
        if (prompt) prompt.classList.add('hidden');
    });
}

function dismissInstallPrompt() {
    const prompt = document.getElementById('install-prompt');
    if (prompt) prompt.classList.add('hidden');
    localStorage.setItem(INSTALL_DISMISSED_KEY, Date.now().toString());
}

// =====================================================
// ===== CONNECT MODE: -3s VISUAL PENALTY + VISIBILITY PAUSE =====
// =====================================================
function showConnectPenalty() {
    const board = document.getElementById('connect-content');
    if (!board) return;
    const penalty = document.createElement('div');
    penalty.className = 'connect-penalty';
    penalty.textContent = '-3s';
    board.style.position = 'relative';
    board.appendChild(penalty);
    setTimeout(() => penalty.remove(), 800);
}

// Pause connect timer when tab is hidden
document.addEventListener('visibilitychange', () => {
    if (!connectState || !connectState.timer) return;
    if (document.hidden) {
        clearInterval(connectState.timer);
        connectState._paused = true;
    } else if (connectState._paused) {
        connectState._paused = false;
        connectState.timer = setInterval(() => {
            connectState.timeLeft--;
            updateConnectHeader();
            if (connectState.timeLeft <= 0) {
                finishConnectMode(false);
            }
        }, 1000);
    }
});

// =====================================================
// ===== SPACED REPETITION SYSTEM (SRS) =====
// =====================================================
const SRS_KEY = 'srsData';

function getSrsData() {
    try { return JSON.parse(localStorage.getItem(SRS_KEY)) || {}; } catch { return {}; }
}

function saveSrsData(data) {
    try { localStorage.setItem(SRS_KEY, JSON.stringify(data)); } catch (e) { console.error('SRS save failed', e); }
}

/**
 * Simple SM-2 inspired algorithm
 * Returns next review interval in days
 */
function calculateSrsInterval(wordId, correct) {
    const data = getSrsData();
    const entry = data[wordId] || { interval: 1, easeFactor: 2.5, repetitions: 0, nextReview: getTodayStr() };

    if (correct) {
        entry.repetitions++;
        if (entry.repetitions === 1) {
            entry.interval = 1;
        } else if (entry.repetitions === 2) {
            entry.interval = 3;
        } else {
            entry.interval = Math.round(entry.interval * entry.easeFactor);
        }
        entry.easeFactor = Math.max(1.3, entry.easeFactor + 0.1);
    } else {
        entry.repetitions = 0;
        entry.interval = 1;
        entry.easeFactor = Math.max(1.3, entry.easeFactor - 0.2);
    }

    const next = new Date();
    next.setDate(next.getDate() + entry.interval);
    entry.nextReview = next.toISOString().split('T')[0];

    data[wordId] = entry;
    saveSrsData(data);
    return entry.interval;
}

function getWordsDueToday(listId) {
    const list = wordLists.find(l => l.id === listId);
    if (!list) return [];
    const srs = getSrsData();
    const today = getTodayStr();

    return list.words.filter(word => {
        const entry = srs[word.id];
        if (!entry) return true; // never studied = due
        return entry.nextReview <= today;
    });
}

// =====================================================
// ===== ACCESSIBILITY IMPROVEMENTS =====
// =====================================================
function addAriaAttributes() {
    // Progress bars
    document.querySelectorAll('.progress-fill').forEach(bar => {
        const container = bar.parentElement;
        if (container) {
            container.setAttribute('role', 'progressbar');
            container.setAttribute('aria-valuemin', '0');
            container.setAttribute('aria-valuemax', '100');
        }
    });

    // Modals
    document.querySelectorAll('.modal').forEach(modal => {
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
    });

    // Close buttons
    document.querySelectorAll('.btn-close, .btn-back').forEach(btn => {
        if (!btn.getAttribute('aria-label')) {
            btn.setAttribute('aria-label', 'Sluiten');
        }
    });
}

// Focus trapping in modals
function trapFocus(element) {
    const focusable = element.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    element._focusTrap = function(e) {
        if (e.key !== 'Tab') return;
        if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
            if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    };
    element.addEventListener('keydown', element._focusTrap);
    first.focus();
}

function releaseFocus(element) {
    if (element._focusTrap) {
        element.removeEventListener('keydown', element._focusTrap);
        delete element._focusTrap;
    }
}

// =====================================================
// ===== INTEGRATION: Hook into existing study completion =====
// =====================================================
const _originalClearActiveSession = typeof clearActiveSession === 'function' ? clearActiveSession : null;

// Monkey-patch finishStudy functions to award XP
(function patchStudyCompletion() {
    // We watch for the complete-view being shown and award XP based on session stats
    const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
            if (m.target.id === 'complete-view' && !m.target.classList.contains('hidden') && m.target.classList.contains('active')) {
                const correct = studySession.correctCount || 0;
                const wrong = studySession.wrongCount || 0;
                const mode = currentStudyMode || 'unknown';
                awardXp(correct, wrong, mode);

                // Also update SRS for each word
                if (studySession.words) {
                    studySession.words.forEach(word => {
                        const stats = word.stats || {};
                        const wasCorrect = stats.correct > (stats._prevCorrect || 0);
                        calculateSrsInterval(word.id, wasCorrect);
                        stats._prevCorrect = stats.correct;
                    });
                }
            }
        }
    });

    const completeView = document.getElementById('complete-view');
    if (completeView) {
        observer.observe(completeView, { attributes: true, attributeFilter: ['class'] });
    }
})();

// =====================================================
// ===== INITIALIZATION OF NEW FEATURES =====
// =====================================================
(function initNewFeatures() {
    // Init gamification UI
    updateGamificationUI();

    // Init offline detection
    initOfflineDetection();

    // Add ARIA attributes
    addAriaAttributes();

    // Show "words due today" indicator
    if (currentListId) {
        const due = getWordsDueToday(currentListId);
        if (due.length > 0) {
            // We could show this in the UI, but for now it's available via getWordsDueToday()
        }
    }

    // Auto-add TTS buttons to question-word elements when content changes
    const studyViews = ['steps-content', 'typing-content', 'cards-content', 'exam-content'];
    studyViews.forEach(viewId => {
        const el = document.getElementById(viewId);
        if (!el) return;
        const obs = new MutationObserver(() => {
            el.querySelectorAll('.question-word:not(.tts-added)').forEach(qw => {
                qw.classList.add('tts-added');
                qw.style.display = 'flex';
                qw.style.alignItems = 'center';
                qw.style.justifyContent = 'center';
                qw.style.gap = '0.5rem';
                const text = qw.textContent.trim();
                // Determine language from current study session qa context
                const list = wordLists.find(l => l.id === currentListId);
                const lang = list ? (studySession.direction === 'def-term' ? list.langTo : list.langFrom) : '';
                const btn = document.createElement('button');
                btn.className = 'tts-btn';
                btn.setAttribute('aria-label', 'Uitspreken');
                btn.title = 'Uitspreken';
                btn.innerHTML = '<i class="fas fa-volume-up"></i>';
                btn.onclick = (e) => { e.stopPropagation(); speakText(text, lang); };
                qw.appendChild(btn);
            });
        });
        obs.observe(el, { childList: true, subtree: true });
    });
})();

// ===== Trema Helper =====
function isTremaHelperEnabled() {
    const cb = document.getElementById('show-trema-helper');
    return cb ? cb.checked : true;
}

const tremaLanguageMap = {
    'fr': ['é','è','ê','ë','à','â','ç','î','ï','ô','œ','ù','û'],
    'frans': ['é','è','ê','ë','à','â','ç','î','ï','ô','œ','ù','û'],
    'de': ['ä','ö','ü','ß'],
    'duits': ['ä','ö','ü','ß'],
    'es': ['á','é','í','ó','ú','ñ','ü','¿','¡'],
    'spaans': ['á','é','í','ó','ú','ñ','ü','¿','¡'],
    'it': ['à','è','é','ì','í','ò','ó','ù'],
    'italiaans': ['à','è','é','ì','í','ò','ó','ù'],
    'pt': ['á','â','ã','à','ç','é','ê','í','ó','ô','õ','ú'],
    'portugees': ['á','â','ã','à','ç','é','ê','í','ó','ô','õ','ú'],
    'nl': ['é','ë','ï','ä','ö','ü'],
    'nederlands': ['é','ë','ï','ä','ö','ü']
};

function getTremaHelperHtml(inputId, lang) {
    if (!isTremaHelperEnabled()) return '';
    let chars = [];
    if (lang && tremaLanguageMap[lang.toLowerCase()]) {
        chars = tremaLanguageMap[lang.toLowerCase()];
    } else {
        return '';
    }
    let btns = chars.map(c => '<button class="trema-btn" type="button" tabindex="-1" onmousedown="event.preventDefault(); insertTremaCharacter(\'' + inputId + '\', \'' + c + '\')">' + c + '</button>').join('');
    return '<div class="trema-helper">' + btns + '</div>';
}

function insertTremaCharacter(inputId, char) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const val = input.value;
    input.value = val.substring(0, start) + char + val.substring(end);
    input.selectionStart = input.selectionEnd = start + 1;
    
    // Trigger input event to update any counters or states
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();
}
