var urlRest = 'http://168.138.141.183:8080/api/Reservation/';
/* var urlRest = 'http://localhost:8080/api/Reservation/'; */

function visualizeInfByStatus() {
    console.log("test");
  $.ajax({
    url: urlRest + "report-status",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);
      visualizeTableByStatus(respuesta);
    },
  });
}

function visualizeTableByStatus(items) {
  let myTable = "<table>";
  myTable += "<pre>        REPORT BY TIME RANGE </pre> <br>";

  myTable += "<div";
  myTable += "<tr>";
  myTable += "<td class='bt sty bsi hg'>   Completed </td>";
  myTable += "<td class='bt btd hg'>   Cancelled </td>";
  myTable += "</tr>";
  myTable += "<tr class='tr'></tr>";
  myTable += "</div>";

  myTable += "<tr>";
  myTable += "<td class='bt bti hg'>" + items.completed + "</td>";
  myTable += "<td class='bt btf hg'>" + items.cancelled + "</td>";
  myTable += "</tr>";
  myTable += "<tr> </tr>";

  myTable += "</table>";
  $("#resultado").html(myTable);

}

function visualizeInfByDate() {
    if(validateFields()){
    var fechaInicio = document.getElementById("startDate").value;
    var fechaCierre = document.getElementById("devolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);

    $.ajax({
      url: urlRest + "report-dates/" + fechaInicio + "/" + fechaCierre,
      type: "GET",
      datatype: "JSON",
      success: function (respuesta) {
        console.log(respuesta);
        visualizeTableByDate(respuesta);
      },
    });
    };
}

function visualizeTableByDate(items) {
    let myTable = "<table>";
    myTable += "<pre>   REPORT BY DATE </pre> <br>";
    myTable += "<div";
    myTable += "<tr>";
    myTable += "<td class='bt sty bsi'>   StartDate </td>";
    myTable += "<td class='bt sty'>       DevDate </td>";
    myTable += "<td class='bt btu btf'>   Status </td>";
    myTable += "</tr>";
    myTable += "<tr class='tr'></tr>";
    myTable += "</div>";
  
    for (i = 0; i < items.length; i++) {
      myTable += "<tr>";
      myTable += "<td class='bt bti'>" +  items[i].startDate.split("T")[0] + "</td>";
      myTable += "<td class='bt'>" +      items[i].devolutionDate.split("T")[0] + "</td>";
      myTable += "<td class='bt btf'>" +  items[i].status + "</td>";
      myTable += "</tr>";
      myTable += "<tr> </tr>";
    }
    myTable += "<tr> </tr> <tr> </tr>";
    myTable += "<td> </td>";
    myTable += "<td class='btt'>   Total </td>";
    myTable += "<td class='bt btf'>" +  items.length + "</td>";
    myTable += "</table>";
    $("#resultado").html(myTable);
  
}

function visualizeInfByClient() {
    $.ajax({
      url: urlRest + "report-clients",
      type: "GET",
      datatype: "JSON",
      success: function (respuesta) {
        console.log(respuesta);
        visualizeTableByClient(respuesta);
      },
    });
}

function visualizeTableByClient(items) {
    let myTable = "<table>";
    myTable += "<pre>   REPORT BY CLIENT </pre> <br>";

    myTable += "<div";
    myTable += "<tr>";
    myTable += "<td class='bt sty bsi'>   Name </td>";
    myTable += "<td class='bt sty'>       Email </td>";
    myTable += "<td class='bt sty'>       Age </td>";
    myTable += "<td class='btd'>          Total </td>";
    myTable += "</tr>";
    myTable += "<tr class='tr'></tr>";
    myTable += "</div>";
  
    for (i = 0; i < items.length; i++) {
      myTable += "<tr>";
      myTable += "<td class='bt bti'>" +  items[i].client.name + "</td>";
      myTable += "<td class='bt'>" +      items[i].client.email + "</td>";
      myTable += "<td class='bt'>" +      items[i].client.age + "</td>";
      myTable += "<td class='bt btf'>" +  items[i].total + "</td>";
      myTable += "</tr>";
      myTable += "<tr> </tr>";
    }
    myTable += "</table>";
    $("#resultado").html(myTable);

}

function validateFields() {
  if ($("#startDate").val() == "") {
    alert("Start Date is Empty!");
    $("#startDate").focus();
    return false;
  } else {
    if ($("#devolutionDate").val() == "") {
      alert("Devolution Date is Empty!");
      $("#devolutionDate").focus();
      return false;
    } else {
      return true;
    }
  }
}

$(document).ready(function () {
  $("#limpiar").click(function () {
    $('input[type="date"]').val("");
  });
});


