(function($) {

    "use strict";

    var table = function() {

      var tableBody = $('.table-list__body'),
          tableHead = $('.table-list__head');


      tableHead.append(
        '<tr><td>'
          + ''        + '</td><td>'
          + 'Команда' + '</td><td>'
          + 'М'       + '</td><td>'
          + 'В'       + '</td><td>'
          + 'Н'       + '</td><td>'
          + 'П'       + '</td><td>'
          + 'Заб'     + '</td><td>'
          + 'Проп'    + '</td><td>'
          + 'О'       + '</td></tr>'

      );

      $.getJSON('seriea.json', function(data){

        for ( var i = 0; i < data.teams.length; i++) {

          tableBody.append(
            '<tr>'
            + '<td data-color="' + data.teams[i].color + '"' + '>' + data.teams[i].place + '</td>'
            + '<td>'
              + '<img src="assets/img/'+ data.teams[i].flag_country +'.png" alt="' + data.teams[i].flag_country + '">'
              + '<a href="' + data.teams[i].tag_url + '">' + data.teams[i].name + '</a>' + '</td>'
            + '<td>' + data.teams[i].matches        + '</td>'
            + '<td>' + data.teams[i].win            + '</td>'
            + '<td>' + data.teams[i].draw           + '</td>'
            + '<td>' + data.teams[i].lose           + '</td>'
            + '<td>' + data.teams[i].goals          + '</td>'
            + '<td>' + data.teams[i].conceded_goals + '</td>'
            + '<td>' + data.teams[i].score          + '</td>'
            + '</tr>'

          );

        };

      });

    };



    /* Init
     * ------------------------------------------------------ */
    (function Init() {

      table();

    })();


})(jQuery);
