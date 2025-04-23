<?php
$professionalId = '67ea5e7e813ce64f6d0281c9';
$apiUrl = "http://localhost:4600/api/appointment/calendar/$professionalId";
$response = file_get_contents($apiUrl);
$events = json_decode($response, true); 

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendrier de Rendez-vous</title>
    <link href="https://cdn.jsdelivr.net/npm/fullcalendar@5.10.0/main.css" rel="stylesheet" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.10.0/main.min.js"></script>
</head>
<body>

    <div id="calendar"></div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Récupérer les événements PHP
            var events = <?php echo json_encode($events); ?>; // Passer les événements PHP au JavaScript

            // Initialiser FullCalendar
            var calendarEl = document.getElementById('calendar'); // Récupérer l'élément du calendrier
            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',  // Vue initiale
                events: events, // Passer les événements à FullCalendar
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay'
                },
             
            });

            // Rendre le calendrier visible
            calendar.render();
        });
    </script>
    
</body>
</html>
