!function(t){"use strict";var d=function(){var d=t(".table-list__body"),a=t(".table-list__head");a.append("<tr><td></td><td>Команда</td><td>М</td><td>В</td><td>Н</td><td>П</td><td>Заб</td><td>Проп</td><td>О</td></tr>"),t.getJSON("seriea.json",function(t){for(var a=0;a<t.teams.length;a++)d.append('<tr><td data-color="'+t.teams[a].color+'">'+t.teams[a].place+'</td><td><img src="assets/img/'+t.teams[a].flag_country+'.png" alt="'+t.teams[a].flag_country+'"><a href="'+t.teams[a].tag_url+'">'+t.teams[a].name+"</a></td><td>"+t.teams[a].matches+"</td><td>"+t.teams[a].win+"</td><td>"+t.teams[a].draw+"</td><td>"+t.teams[a].lose+"</td><td>"+t.teams[a].goals+"</td><td>"+t.teams[a].conceded_goals+"</td><td>"+t.teams[a].score+"</td></tr>")})};!function(){d()}()}(jQuery);