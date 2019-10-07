//Minify with https://closure-compiler.appspot.com/home
var eventStore;  //Events  datastore - Event Calendar
var workshopStore;  //Workshops & Classes datastore

//Write out the EVENTS retrieved data
gotDataQuery2019 = function (items) {
  //Begin 'accordion' DIV
  var allActivities = "<div class='panel-group' id='accordion'>";

  if (items.length == 0) {
    allActivities += "<span class='text-normal'>Sorry, no events for selected criteria.</span>" + "</div>";
  } else {
    if (items.length > 1) {
      allActivities += "<div class='title-second' id='box-text'>" + items.length + " Events</div>"
    } else {
      allActivities += "<div class='title-second' id='box-text'>One Event</div>"
    }

    //Contents of each event------------------------------------------------
    for (var i = 0; i < items.length; i++) {
      //NEED TO USE COUNT (i) FOR DIVs id

      //Summary - Title bar
      allActivities += "<div class='panel panel-default'><div class='panel-heading'><h4 class='panel-title'><a data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "'><p class='title-third'>";
      allActivities += items[i].Date + "<br><span style='color: #011689;'>" + String(items[i].Title).replace(/""/g, "\"") + "</span></p></a></h4></div>";

      //Content - collapsable panels
      if (i == 0) {
        allActivities += "<div id='collapse" + i + "' class='panel-collapse collapse in'><div class='panel-body'>"; //open first panel
      } else {
        allActivities += "<div id='collapse" + i + "' class='panel-collapse collapse'><div class='panel-body'>";
      }

      allActivities += "<div>";

      //Program
      if (items[i].Program != "") {
        allActivities += String(items[i].Program).replace(/""/g, "\"") + "<br>"
      }

      //Time & Cost
      allActivities += String(items[i].Times).replace(/""/g, "\"") + " | " +
        items[i].Cost +
        "</div>"

      //Get thumbnail image - if exists
      var thumbnail = "";
      var thumbnailCredit = "";
      if (items[i].Images != "") {
        thumbnail += "<img src='/wp-content/themes/Divi-child/thumbnails/" + items[i].Images + "T.jpg' style='width:150px;height:200px;margin:5px;border:solid 1px #999;padding:2px; float:right;' title='" + items[i].Title + "'  />";
        if (items[i].Credit != "") {
          thumbnailCredit = "<span class='text-small' style='float:right; clear: both;'>Image Credit: " + items[i].Credit + "</span>";  //thumbnail credit
        }
      }

      //Description with thumbnail
      allActivities += "<div><p><br>" +
        thumbnail + //needs to be first to float correctly
        String(items[i].Description).replace(/""/g, "\"") + "<br>" + //replace any "" with "
        thumbnailCredit + "</p></div>";

      //Location info 
      allActivities += "<div style='clear: both;'>" +
        "<br><b>" + items[i].Location +
        "</b><br>&nbsp;&nbsp;" + items[i].Address;

      //Address fixes for links
      //remove extra notes from address and use first item in resulting array - , & (
      var iAddress1 = new String(items[i].Address); //address for Itinerary & Get Directions
      var iAddress = iAddress1.split(/,|\(/)[0]; //address for Itinerary & Get Directions
      //Opera Alley & Steele fix
      if (iAddress.search(/opera/i) != -1) {
        iAddress = "705 Court C";
      } else if (iAddress.search(/2926 S. Steele St./i) != -1) {
        iAddress = "2926 S. Steele St.";
      } else if (iAddress.search(/1901 Commerce St./i) != -1) {
        iAddress = "1901 Commerce St.";
      }

      //replace &
      iAddress = iAddress.replace("&", "and")

      //MAP IT
      allActivities += " - <a href=\"http://maps.google.com/maps?f=q&hl=en&geocode=&q=" + iAddress + ",Tacoma,WA\" target='_blank' title='Open Google Map with location.'>Map It</a>";

      //Phone
      if (items[i].Phone != "") {
        allActivities += "<br>&nbsp;&nbsp;Contact: " + items[i].Phone
      }

      //Website
      if (items[i].Web != "") {
        allActivities += "<br><span style='word-wrap:break-word; width:248px;'>&nbsp;&nbsp;Website: <a href='http://" + items[i].Web + "' target=_blank>" + items[i].Web + "</a></span>"
      }

      allActivities += "<br>&nbsp;</div>";

      //Format Category - removing leading/trailing | characters
      var category = items[i].Category + "";
      if (category.substr(0, 1) == "|") {
        category = category.substring(1);
      }
      var len = category.length;
      if (category.substr(len - 1, 1) == "|") {
        category = category.substring(0, len - 1);
      }

      allActivities += "<div><i>" + category + "</i></div>";

      allActivities += "<div>"  //Begin section around icons
      //Wheelchair
      if (items[i].Wheelchair == "Yes") {
        allActivities += "<img src='/wp-content/themes/Divi-child/images/Logo/Wheelchair.jpg' title='wheelchair accessible venue' style='width:20px;height:20px; float: right;padding:4px;' align='top'>";
      }

      //Funded
      if (items[i].Funded == "Yes") {
        allActivities += "<img src='/wp-content/themes/Divi-child/images/Logo/TACfunded.jpg' title='funded by Tacoma Arts Commission in 2019' style='width:20px;height:20px; float: right;padding:4px;' align='top'>";
      }
      allActivities += "</div>"  //End section around icons

      if (i != 0) {
        allActivities += "<div class='box-line'></div>" //gray dividing line
        allActivities += "<div style='clear:both;'><a href='#top'>Back to top of page</a></div>";
      }

      allActivities += "</div></div></div>"; //end panel-default, collapse0, panel-body
    };
    //end Contents of each event------------------------------------------------

    allActivities += "</div>"; //end   'accordion' 
    allActivities += "</div>" //close 'Events' DIV
  };

  document.getElementById("Events").innerHTML = allActivities; //Uncomment with new spreadsheet!!!!!!!!!!!!!!!!!!!
};

//Write out the Studio Tour retrieved data ---------------------------------
gotDataQueryStudioTours = function (items, $) {
  //Begin 'accordion' DIV
  var allActivities = "<div class='panel-group' id='accordion'>";

  if (items.length == 0) {
    allActivities = allActivities + "<span class='text-normal'>Sorry...</span></div></div>";
  } else {
    for (var i = 0; i < items.length; i++) {

      //NEED TO USE COUNT (i) FOR DIVs id
      //Summary - Title bar
      allActivities += "<div class='panel panel-default'><div class='panel-heading'><h4 class='panel-title'><a data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "'><p class='title-third'>";
      allActivities += "<span style='color: #011689;'>" + items[i].FirstName + " " + items[i].LastName + "</span> Studio #" + items[i].StudioNumber + "<br><span class='text-normal'>" + items[i].Media + "</span></p></a></h4></div>";

      //Content - description
      if (i == 0) {
        allActivities += "<div id='collapse" + i + "' class='panel-collapse collapse in'><div class='panel-body'>";   //open first panel
      } else {
        allActivities += "<div id='collapse" + i + "' class='panel-collapse collapse'><div class='panel-body'>";
      }

      allActivities += "<div>";
      allActivities += "<img style=\"float:left;width:75px;height:100px;margin:0px 10px 5px 5px;border:solid 1px #999;padding:2px\" src=\"/wp-content/themes/Divi-child/images/studios/" + items[i].PhotoFileName + "T.jpg\" title=\"" + items[i].FirstName + " " + items[i].LastName + "\"/>";
      allActivities += "<b>" + items[i].FirstName + " " + items[i].LastName;
      if (items[i].BusinessName != "") {
        allActivities += " | " + items[i].BusinessName;
      }
      allActivities += "</b><br>";
      allActivities += "<i>" + items[i].Media + "</i><br>";
      allActivities += "</div><div style='clear:both;'>";   //under image
      allActivities += items[i].ArtistStatement + "<br>";
      //replace any "" with "
      allActivities += "<span class='text-info'><br><b>Open " + items[i].DayPreference + "</b><br>&nbsp;"
        + items[i].StudioAddress + "<br>";

      if (items[i].AccessDirection != "") {
        allActivities += "<i>" + items[i].AccessDirection + "</i><br>";
      }

      if (items[i].Phone != "") {
        allActivities += items[i].Phone + "<br>";
      }

      if (items[i].Email != "") {
        allActivities += "<a href='mailto:" + items[i].Email + "?subject=Art At Work Studio Tour'>" + items[i].Email + "</a><br>&nbsp;";
      }

      if (items[i].Website != "") {
        allActivities += "<a href='http://" + items[i].Website + "' target=_blank>" + items[i].Website + "</a><br>&nbsp;";
      }

      allActivities += "</span>";

      //Demo
      if (items[i].Demo != "") {
        allActivities += "<p><b>DEMO: </b>" + items[i].Demo + "</p>";
      }

      //Add Calendar link 
      var theDay = 3; //default Saturday & Sunday
      if (items[i].DayPreference == "Saturday") {
        theDay = 1;
      } else if (items[i].DayPreference == "Sunday") {
        theDay = 2;
      }
      //Address fixes for links
      //remove extra notes from address and use first item in resulting array - , & (
      var iAddress1 = new String(items[i].StudioAddress);  //address for Itinerary & Get Directions
      var iAddress = iAddress1.split(/,|\(/)[0];  //address for Itinerary & Get Directions
      //Opera Alley & Steele fix
      if (iAddress.search(/opera/i) != -1) {
        iAddress = "705 Court C";
      } else if (iAddress.search(/2926 S. Steele St./i) != -1) {
        iAddress = "2926 S. Steele St.";
      } else if (iAddress.search(/1901 Commerce St./i) != -1) {
        iAddress = "1901 Commerce St.";
      }

      //replace &
      iAddress = iAddress.replace("&", "and")

      allActivities += "<p class='text-normal'> <span style='text-align: left;'><a href=\"https://wspdsmap.cityoftacoma.org/website/HistoricMap/scripts/calendar/Calendar.asp?Day=" + theDay + "&Studio=" + items[i].StudioNumber + "&Address=" + items[i].StudioAddress + "&Name=" + items[i].FirstName + " " + items[i].LastName + "\" target='_blank' title='Open file to add appointment to your calendar.'>Add to Calendar</a><br>";
      allActivities += "<a href=\"http://maps.google.com/maps?f=q&hl=en&geocode=&q=" + iAddress + ",Tacoma,WA\" target='_blank' title='Open Google Map of Studio location.'>Map It</a></span></p>";

      //Wheelchair
      if (items[i].Wheelchair == "Yes") {
        allActivities += "<img src=\"/wp-content/themes/Divi-child/images/Logo/Wheelchair.jpg\" title=\"wheelchair accessible studio\" style=\"width:20px;height:20px;margin:2px 5px 5px 0px;border:solid 1px #999;padding:2px;\">";
      }

      //Funded
      if (items[i].FundedbyTAC == "Yes") {
        allActivities += "<img src=\"/wp-content/themes/Divi-child/images/Logo/TACfunded.jpg\" title=\"artist funded by Tacoma Arts Commission in 2019\" style=\"width:20px;height:20px;margin:2px 5px 5px 0px;border:solid 1px #999;padding:2px;\">";
      }

      //GTCF
      if (items[i].GTCF == "Yes") {
        allActivities += "<img src=\"/wp-content/themes/Divi-child/images/Logo/GTCF.jpg\" title=\"artist nominated for Greater Tacoma Community Foundation\'s Foundation of Art Award\" style=\"width:20px;height:20px;margin:2px 5px 5px 0px;border:solid 1px #999;padding:2px;\">";
      }

      //Passport
      if (items[i].PassportItem == "Yes") {
        allActivities += "<img src=\"/wp-content/themes/Divi-child/images/Logo/Passport.jpg\" title=\"artwork by these artists are included in Studio Tour Passport prize packages\" style=\"width:20px;height:20px;margin:2px 5px 5px 0px;border:solid 1px #999;padding:2px;\">";
      }

      allActivities += "</div>";  //end content description
      allActivities += "</div></div></div>";   //end total description
    };
    allActivities += "</div>";  //end   'accordion' 
  };

  $("#StudioTours").html(allActivities);    //add all studio tour info to page
};  //end Studio Tour Formatting  ------------------------------------------

//Write out the retrieved data - Exhibits ==================================
gotDataQueryExhibits = function (items, $) {
  //Begin 'accordion' DIV
  var allActivities = "<div class='panel-group' id='accordion'>";

  if (items.length == 0) {
    allActivities += "<span class='text-normal'>Sorry, no exhibits for selected criteria.</span></div>";
  } else {
    if (items.length > 1) {
      allActivities += "<div class='title-second' id='box-text'>" + items.length + " Exhibits</div>"
    } else {
      allActivities += "<div class='title-second' id='box-text'>One Exhibit</div>"
    }

    for (var i = 0; i < items.length; i++) {
      //NEED TO USE COUNT (i) FOR DIVs id
      //Summary - Title bar
      allActivities += "<div class='panel panel-default'><div class='panel-heading'><h4 class='panel-title'><a data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "'><p class='title-third'>";
      allActivities += items[i].Date + "<br><span style='color: #011689;'>" + items[i].Title + "</span></p></a></h4></div>";

      //Content - description
      if (i == 0) {
        allActivities += "<div id='collapse" + i + "' class='panel-collapse collapse in'><div class='panel-body'>";   //open first panel
      } else {
        allActivities += "<div id='collapse" + i + "' class='panel-collapse collapse'><div class='panel-body'>";
      }

      //Program
      if (items[i].Program != "") {
        allActivities += String(items[i].Program).replace(/""/g, "\"") + "<br>"
      }
      //Time & Cost
      allActivities += "<div>" + String(items[i].Time).replace(/""/g, "\"") + " | " +
        items[i].Cost +
        "</div>"
      //Get thumbnail image - if exists
      var thumbnail = "";
      var thumbnailCredit = "";
      if (items[i].Images != "") {
        thumbnail += "<img src='/wp-content/themes/Divi-child/thumbnails/" + items[i].Images + "T.jpg' style='width:150px;height:200px;margin:5px;border:solid 1px #999;padding:2px; float:right;' title='" + items[i].Title + "'  />";
        if (items[i].Credit != "") {
          thumbnailCredit = "<span class='text-small' style='float:right; clear: both;'>Image Credit: " + items[i].Credit + "</span>";  //thumbnail credit
        }
      }

      //Description with thumbnail
      allActivities += "<div><p><br>" +
        thumbnail + //needs to be first to float correctly
        String(items[i].Description).replace(/""/g, "\"") + "<br>" + //replace any "" with "
        thumbnailCredit + "</p></div>";

      //Location info 
      allActivities += "<div style='clear: both;'>" +
        "<br><b>" + items[i].Location +
        "</b><br>&nbsp;&nbsp;" + items[i].Address;

      //Address fixes for links
      //remove extra notes from address and use first item in resulting array - , & (
      var iAddress1 = new String(items[i].Address); //address for Itinerary & Get Directions
      var iAddress = iAddress1.split(/,|\(/)[0]; //address for Itinerary & Get Directions
      //Opera Alley & Steele fix
      if (iAddress.search(/opera/i) != -1) {
        iAddress = "705 Court C";
      } else if (iAddress.search(/2926 S. Steele St./i) != -1) {
        iAddress = "2926 S. Steele St.";
      } else if (iAddress.search(/1901 Commerce St./i) != -1) {
        iAddress = "1901 Commerce St.";
      }

      //replace &
      iAddress = iAddress.replace("&", "and")

      //MAP IT
      allActivities += " - <a href=\"http://maps.google.com/maps?f=q&hl=en&geocode=&q=" + iAddress + ",Tacoma,WA\" target='_blank' title='Open Google Map with location.'>Map It</a>";

      //Phone
      if (items[i].Phone != "") {
        allActivities += "<br>&nbsp;&nbsp;Contact: " + items[i].Phone
      }

      //Website
      if (items[i].Web != "") {
        allActivities += "<br><span style='word-wrap:break-word; width:248px;'>&nbsp;&nbsp;Website: <a href='http://" + items[i].Web + "' target=_blank>" + items[i].Web + "</a></span>"
      }

      allActivities += "<br>&nbsp;</div>";

      //Format Category - removing leading/trailing | characters
      var category = items[i].Category + "";
      if (category.substr(0, 1) == "|") {
        category = category.substring(1);
      }
      var len = category.length;
      if (category.substr(len - 1, 1) == "|") {
        category = category.substring(0, len - 1);
      }

      allActivities += "<div><i>" + category + "</i></div>";

      allActivities += "<div>"  //Begin section around icons
      //Wheelchair
      if (items[i].Wheelchair == "Yes") {
        allActivities += "<img src='/wp-content/themes/Divi-child/images/Logo/Wheelchair.jpg' title='wheelchair accessible venue' style='width:20px;height:20px; float: right;padding:4px;' align='top'>";
      }

      //Funded
      if (items[i].Funded == "Yes") {
        allActivities += "<img src='/wp-content/themes/Divi-child/images/Logo/TACfunded.jpg' title='funded by Tacoma Arts Commission in 2019' style='width:20px;height:20px; float: right;padding:4px;' align='top'>";
      }
      allActivities += "</div>"  //End section around icons


      if (i != 0) {
        allActivities += "<div class='box-line'></div>" //gray dividing line
        allActivities += "<div style='clear:both;'><a href='#top'>Back to top of page</a></div>";
      }


      allActivities += "</div></div></div>"; //end panel-default, collapse0, panel-body
    };
    //end Contents of each event------------------------------------------------

    allActivities += "</div>"; //end   'accordion' 
    allActivities += "</div>" //close 'Events' DIV
  };

  document.getElementById("Exhibits").innerHTML = allActivities; //Uncomment with new spreadsheet!!!!!!!!!!!!!!!!!!!
};  //end Exhibits Formatting ----------------------------------------------

//Write out the retrieved data - WORKSHOPS & CLASSES =======================
gotDataQueryClasses = function (items) {
  var allActivities = "<div id='actTable'>";
  //Begin 'accordion' DIV
  var allActivities = "<div class='panel-group' id='accordion'>";

  if (items.length == 0) {
    ;
    allActivities += "<span class='text-normal'>Sorry, no classes for selected criteria.</span></div>";
  } else {
    allActivities += "<div class='title-second' id='box-text'>" + items.length + " Classes</div>"
    for (var i = 0; i < items.length; i++) {
      //NEED TO USE COUNT (i) FOR DIVs id

      //Summary - Title bar
      allActivities += "<div class='panel panel-default'><div class='panel-heading'><h4 class='panel-title'><a data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "'><p class='title-third'>";
      allActivities += items[i].Date + "<br><span style='color: #011689;'>" + items[i].Title + "</span></p></a></h4></div>";

      //Content - description
      if (i == 0) {
        allActivities += "<div id='collapse" + i + "' class='panel-collapse collapse in'><div class='panel-body'>";   //open first panel
      } else {
        allActivities += "<div id='collapse" + i + "' class='panel-collapse collapse'><div class='panel-body'>";
      }

      //Program
      if (items[i].Program != "") {
        allActivities += String(items[i].Program).replace(/""/g, "\"") + "<br>"
      }
      //Time & Cost
      allActivities += "<div>" + String(items[i].Time).replace(/""/g, "\"") + " | " +
        items[i].Cost +
        "</div>"
      //Get thumbnail image - if exists
      var thumbnail = "";
      var thumbnailCredit = "";
      if (items[i].Images != "") {
        thumbnail += "<img src='/wp-content/themes/Divi-child/thumbnails/" + items[i].Images + "T.jpg' style='width:150px;height:200px;margin:5px;border:solid 1px #999;padding:2px; float:right;' title='" + items[i].Title + "'  />";
        if (items[i].Credit != "") {
          thumbnailCredit = "<span class='text-small' style='float:right; clear: both;'>Image Credit: " + items[i].Credit + "</span>";  //thumbnail credit
        }
      }

      //Description with thumbnail
      allActivities += "<div><p><br>" +
        thumbnail + //needs to be first to float correctly
        String(items[i].Description).replace(/""/g, "\"") + "<br>" + //replace any "" with "
        thumbnailCredit + "</p></div>";

      //Location info 
      allActivities += "<div style='clear: both;'>" +
        "<br><b>" + items[i].Location +
        "</b><br>&nbsp;&nbsp;" + items[i].Address;

      //Address fixes for links
      //remove extra notes from address and use first item in resulting array - , & (
      var iAddress1 = new String(items[i].Address); //address for Itinerary & Get Directions
      var iAddress = iAddress1.split(/,|\(/)[0]; //address for Itinerary & Get Directions
      //Opera Alley & Steele fix
      if (iAddress.search(/opera/i) != -1) {
        iAddress = "705 Court C";
      } else if (iAddress.search(/2926 S. Steele St./i) != -1) {
        iAddress = "2926 S. Steele St.";
      } else if (iAddress.search(/1901 Commerce St./i) != -1) {
        iAddress = "1901 Commerce St.";
      }

      //replace &
      iAddress = iAddress.replace("&", "and")

      //MAP IT
      allActivities += " - <a href=\"http://maps.google.com/maps?f=q&hl=en&geocode=&q=" + iAddress + ",Tacoma,WA\" target='_blank' title='Open Google Map with location.'>Map It</a>";

      //Phone
      if (items[i].Phone != "") {
        allActivities += "<br>&nbsp;&nbsp;Contact: " + items[i].Phone
      }

      //Website
      if (items[i].Web != "") {
        allActivities += "<br><span style='word-wrap:break-word; width:248px;'>&nbsp;&nbsp;Website: <a href='http://" + items[i].Web + "' target=_blank>" + items[i].Web + "</a></span>"
      }

      allActivities += "<br>&nbsp;</div>";

      //Format Category - removing leading/trailing | characters
      var category = items[i].Category + "";
      if (category.substr(0, 1) == "|") {
        category = category.substring(1);
      }
      var len = category.length;
      if (category.substr(len - 1, 1) == "|") {
        category = category.substring(0, len - 1);
      }

      allActivities += "<div><i>" + category + "</i></div>";

      allActivities += "<div>"  //Begin section around icons
      //Wheelchair
      if (items[i].Wheelchair == "Yes") {
        allActivities += "<img src='/wp-content/themes/Divi-child/images/Logo/Wheelchair.jpg' title='wheelchair accessible venue' style='width:20px;height:20px; float: right;padding:4px;' align='top'>";
      }

      //Funded
      if (items[i].Funded == "Yes") {
        allActivities += "<img src='/wp-content/themes/Divi-child/images/Logo/TACfunded.jpg' title='funded by Tacoma Arts Commission in 2019' style='width:20px;height:20px; float: right;padding:4px;' align='top'>";
      }
      allActivities += "</div>"  //End section around icons


      if (i != 0) {
        allActivities += "<div class='box-line'></div>" //gray dividing line
        allActivities += "<div style='clear:both;'><a href='#top'>Back to top of page</a></div>";
      }


      allActivities += "</div></div></div>"; //end panel-default, collapse0, panel-body
    };
    //end Contents of each event------------------------------------------------

    allActivities += "</div>"; //end   'accordion' 
    allActivities += "</div>" //close 'Events' DIV
  };

  document.getElementById("Activities_Classes").innerHTML = allActivities; //Uncomment with new spreadsheet!!!!!!!!!!!!!!!!!!!
}; //end      WORKSHOPS & CLASSES formatting -------------------------------

_filterWatch = function ($) {
  //Watch for changes in the category and date selections, then refresh activity query
  if (document.getElementById("date1") != null) { //only do if on Events page (has a calendar) - Do here because other pages will throw errors trying to find dijit.byId (doesn't exist on other pages)
    //Restrict calendar on-the-fly to prevent queries like - tomorrow to yesterday 
    $('#date1').datepicker('option', { maxDate: $('#date2').datepicker().val() });  //Set max date of START date to current END date
    $('#date2').datepicker('option', { minDate: $('#date1').datepicker().val() });  //Set min date of ENDd date to current START date

    $("#theActTitle").html($('#categorySelect').val() + ' | ' + $('#date1').datepicker({ dateFormat: 'mm-dd-yyyy' }).val() + ' - ' + $('#date2').datepicker({ dateFormat: 'mm-dd-yyyy' }).val()); //update activity filter title

    //Fix for Start Date (not using dates equal - only >, so subtract a day) -  need two digits for month/day/year so GT and LT works correctly, end date working correctly
    var actualDate = new Date($('#date1').val()); //selected start date
    var newDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate() - 1);  //subtract one day
    var dd = newDate.getDate();
    var mm = newDate.getMonth() + 1; //January is 0!
    var yyyy = newDate.getFullYear(); //Year
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    var newStartDate = mm + '/' + dd + '/' + yyyy; //Start date formatted for calendar
    //end date fix

    eventStore_filtered = eventStore.filter(function (row) {  //Filter JSON for selected parameters
      if ($('#categorySelect').val() == "All Activities") {
        return row['Date'] >= newStartDate && row['Date'] <= $('#date2').datepicker({ dateFormat: 'mm-dd-yyyy' }).val();  //just do the date queries - dates must be formatted MM/dd/yy - Date field
      } else {
        return row['Category'].indexOf($('#categorySelect').val()) >= 0 && row['Date'] >= newStartDate && row['Date'] <= $('#date2').datepicker({ dateFormat: 'mm-dd-yyyy' }).val();  //if substring doesn't exist it will return -1
      }
    });
    gotDataQuery2019(eventStore_filtered);  //format results and add to page
  } //end if Calendar page
};

_filterWatchWorkshops = function ($) {
  //Watch for changes in the category and date selections, then refresh activity query
  $("#theActTitle").html($('#categorySelectWorkshops').val()); //update activity filter title

  workshopStore_filtered = workshopStore.filter(function (row) {  //Filter JSON for selected parameters
    if ($('#categorySelectWorkshops').val() == "All") {
      return workshopStore;
    } else {
      return row['Category'].indexOf($('#categorySelectWorkshops').val()) >= 0;  //if substring doesn't exist it will return -1
    }
  });
  gotDataQueryClasses(workshopStore_filtered);  //format results and add to page
};


//Complete setup once WordPress jQuery is ready (functions.php)
jQuery(document).ready(function ($) {  //Use $ instead of jQuery from now on
  //Get today's date & 30 days from now for initial filtering --------------
  var dateToday = new Date(); //dateToday format = mm+'/'+dd+'/'+yyyy;
  var dd = dateToday.getDate();
  var mm = dateToday.getMonth() + 1; //January is 0!
  var yyyy = dateToday.getFullYear(); //Year
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  var dateTodayCalendar = mm + '/' + dd + '/' + yyyy; //Today's date formatted for calendar
  if (dateTodayCalendar < '09/07/2019' || dateTodayCalendar > '11/15/2019') {
    dateTodayCalendar = '09/07/2019';  //force Sept 15 or later (today's date) for start of calendar, but if past Nov 15 go back to Sept 15
  }
  //End get today's date ---------------------------------------------------- 

  //Start Date for Events
  $("#date1").datepicker({  //https://jqueryui.com/datepicker/ | http://api.jqueryui.com/datepicker/
    minDate: '09/07/2019',
    maxDate: '11/15/2019',
    onSelect: function (date) {
      _filterWatch($);  //update selected events
    }
  });

  $('#date1').datepicker().datepicker('setDate', dateTodayCalendar);  //Set Start Date

  //End Date for Events
  $("#date2").datepicker({
    minDate: '09/07/2019',
    maxDate: '11/15/2019',
    onSelect: function (date) {
      _filterWatch($);  //update selected events
    }
  });
  $('#date2').datepicker().datepicker('setDate', '11/15/2019');  //set End Date - end of Tacoma Arts Month

  //Start Date for Workshops
  $("#startDateWorkshops").datepicker({  //https://jqueryui.com/datepicker/ | http://api.jqueryui.com/datepicker/
    minDate: '09/07/2019',
    maxDate: '11/15/2019',
    onSelect: function (date) {
      _filterWatchWorkshops($);  //update selected Workshops
    }
  });

  $('#startDateWorkshops').datepicker().datepicker('setDate', dateTodayCalendar);  //Set Start Date

  //End Date for Workshops
  $("#endDateWorkshops").datepicker({
    minDate: '09/07/2019',
    maxDate: '11/15/2019',
    onSelect: function (date) {
      _filterWatchWorkshops($);  //update selected Workshops
    }
  });
  $('#endDateWorkshops').datepicker().datepicker('setDate', '11/15/2019');  //set End Date - end of Tacoma Arts Month



  //Category Menu for Events - https://api.jqueryui.com/selectmenu/ -------------------------------------
  $("#categorySelect").selectmenu({
    //width: 162
  });

  $('#categorySelect').append($('<option>', {
    value: 'All Activities',
    text: 'All Activities'
  }));
  $('#categorySelect').append($('<option>', {
    value: 'For Kids',
    text: 'Children’s Program'
  }));
 $('#categorySelect').append($('<option>', {
    value: 'Comedy',
    text: 'Comedy'
  }));
  $('#categorySelect').append($('<option>', {
    value: 'Community Event',
    text: 'Community Event'
  }));
  $('#categorySelect').append($('<option>', {
    value: 'Culinary Arts',
    text: 'Culinary'
  }));
  $('#categorySelect').append($('<option>', {
    value: 'Cultural Event',
    text: 'Cultural'
  }));
  $('#categorySelect').append($('<option>', {
    value: 'Dance',
    text: 'Dance'
  }));
  $('#categorySelect').append($('<option>', {
    value: 'Digital',
    text: 'Digital'
  }));
  $('#categorySelect').append($('<option>', {
    value: 'Educational',
    text: 'Educational'
  }));
  $('#categorySelect').append($('<option>', {
    value: 'Featured Event',
    text: 'Featured Event'
  }));
  $('#categorySelect').append($('<option>', {
    value: 'Film',
    text: 'Film'
  }));
  $('#categorySelect').append($('<option>', {
    value: 'Fundraiser',
    text: 'Fundraiser'
  }));
  $('#categorySelect').append($('<option>', {
    value: 'History',
    text: 'History'
  }));
  $('#categorySelect').append($('<option>', {
    value: 'Interdisciplinary',
    text: 'Interdisciplinary'
  }));
  $('#categorySelect').append($('<option>', {
    value: 'Lecture',
    text: 'Lecture'
  }));
  $('#categorySelect').append($('<option>', {
    value: 'Literary',
    text: 'Literary'
  }));
   $('#categorySelect').append($('<option>', {
    value: 'Metal',
    text: 'Metal'
  }));
  $('#categorySelect').append($('<option>', {
    value: 'Music',
    text: 'Music'
  }));
  $('#categorySelect').append($('<option>', {
    value: 'Nightlife',
    text: 'Nightlife' 
  }));
  $('#categorySelect').append($('<option>', {
    value: 'Opera',
    text: 'Opera' 
  }));
  $('#categorySelect').append($('<option>', {
    value: 'Other',
    text: 'Other' 
  }));
  $('#categorySelect').append($('<option>', {
    value: 'Theater',
    text: 'Theater'
  }));
  $('#categorySelect').append($('<option>', {
    value: 'Visual Art',
    text: 'Visual Art'
  }));
  $('#categorySelect').append($('<option>', {
    value: 'Wearable Art',
    text: 'Wearable Art'
  }));

  $('#categorySelect').selectmenu("refresh"); //Refresh the selectmenu widget so the newly added options to the dropdown are now loaded properly

  $("#categorySelect").on("selectmenuselect", function () {
    _filterWatch($);
  });
  //End Category Menu ----------------------------------------------

  //Category Menu for Workshops - https://api.jqueryui.com/selectmenu/ -------------------------------------
  $("#categorySelectWorkshops").selectmenu({
    //width: 162
  });
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'All',
    text: 'All'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'For Kids',
    text: 'Children’s Program'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'Comedy',
    text: 'Comedy'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'Community Event',
    text: 'Community Event'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'Culinary Arts',
    text: 'Culinary Arts'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'Cultural Event',
    text: 'Cultural Event'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'Dance',
    text: 'Dance'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'Digital',
    text: 'Digital'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'Educational',
    text: 'Educational'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'Film',
    text: 'Film'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'History',
    text: 'History'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'Interdisciplinary',
    text: 'Interdisciplinary'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'Lecture',
    text: 'Lecture'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'Literary',
    text: 'Literary'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'Metal',
    text: 'Metal'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'Music',
    text: 'Music'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'Nightlife',
    text: 'Nightlife'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'Opera',
    text: 'Opera'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'Other',
    text: 'Other'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'Theater',
    text: 'Theater'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'Visual Art',
    text: 'Visual Art'
  }));
  $('#categorySelectWorkshops').append($('<option>', {
    value: 'Wearable Art',
    text: 'Wearable Art'
  }));

  $('#categorySelectWorkshops').selectmenu("refresh"); //Refresh the selectmenu widget so the newly added options to the dropdown are now loaded properly

  $("#categorySelectWorkshops").on("selectmenuselect", function () {
    _filterWatchWorkshops($);  //update selected workshops and classes
  });
  //End Category Menu for Workshops

  //UPDATE PAGES WITH SPREADSHEET (JSON) DATA ----------

  //Use D3 for Events query - https://api.jquery.com/jquery.getjson/ | http://learnjsdata.com/read_data.html
  if (document.getElementById("Events")) {  //only do if on Events page
    d3.json("/wp-content/themes/Divi-child/text_files/Events2019.txt?v=20190903", function (data) {
      eventStore = data; //All Events datastore - need to wait for calendars and update eventStore before running _filterWatch
      _filterWatch($); //Run query using initial dates and activity (All) - Events |  Need to pass jQuery functions along with $
    });
  }

  //Use D3 for Exhibits query - 2020 TRY TO DO ALL WITH JQUERY (D3 FOR DATES IN 2019) & AND POSSIBLY COMBINE ALL WATCH FILTERS
  if (document.getElementById("Exhibits")) {  //only do if on Exhibits page
    d3.json("/wp-content/themes/Divi-child/text_files/Exhibits2019.txt?v=20190903", function (data) {
      gotDataQueryExhibits(data, $);  //Update Exhibits page
    });
  }

  //Use D3 for Workshop query - 2020 TRY TO DO ALL WITH JQUERY (D3 FOR DATES IN 2019) & AND POSSIBLY COMBINE ALL WATCH FILTERS
  if (document.getElementById("Activities_Classes")) {  //only do if on Workshop & Classes page
    d3.json("/wp-content/themes/Divi-child/text_files/OctWorkshops2019.txt?v=20191001", function (data) {
      workshopStore = data; //All Workshops datastore - need to wait for calendars and update eventStore before running _filterWatch
      _filterWatchWorkshops($); //Run query using initial dates and activity (All) - Workshops |  Need to pass jQuery functions along with $
    });
  }

  //Update data objects (except Events) - caution: if the JSON file contains a syntax error, the request will usually fail silently
  if (document.getElementById("StudioTours")) {  //only do if on Studio Tour page
    $.getJSON("/wp-content/themes/Divi-child/text_files/StudioTours2019.txt?v=20190903", function (data) {
      gotDataQueryStudioTours(data, $);  //Update Studio Tour page
    });
  }

  //2020 TEST - LOAD CSV FILE INSTEAD OF JSON - https://www.js-tutorials.com/javascript-tutorial/reading-csv-file-using-jquery/
  //2020 - Maybe eliminate need to use D3 (all jQuery instead)
}); //end jQuery ready check

