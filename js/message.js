var urlRest = 'http://129.159.58.143:8080/api/Message/';
var urlMotorbike = "http://129.159.58.143:8080/api/Motorbike/all";
var urlClient = "http://129.159.58.143:8080/api/Client/all";

/* var urlRest = 'http://localhost:8080/api/Message/';
var urlMotorbike =  "http://localhost:8080/api/Motorbike/all";
var urlClient = "http://localhost:8080/api/Client/all"; */

$(document).ready(function () {
  visualizeInf();
});

function visualizeInf() {
  $.ajax({
    url: urlRest + "all",
    type: "GET",
    datatype: "JSON",

    success: function (respuesta) {
      console.log(respuesta);
      visualizeTable(respuesta);
    },
  });
}

function visualizeTable(items) {
  let myTable = "<table>";
  myTable += "<div";
  myTable += "<tr>";
  myTable += "<td class='bt sty bsi'>   Cliente </td>";
  myTable += "<td class='bt sty'>   Motorbike </td>";
  myTable += "<td class='bt sty btm' style='text-align: center;'>    Mensaje </td>";
  myTable += "<td class='btu'>   Update </td>";
  myTable += "<td class='btd'>   Delete </td>";
  myTable += "</tr>";
  myTable += "<tr class='tr'></tr>";
  myTable += "</div>";

  for (i = 0; i < items.length; i++) {
    myTable += "<tr>";
    myTable += "<td class='bt bti'>" +         items[i].client.name + "</td>";
    myTable += "<td class='bt'>" +    items[i].motorbike.name + "</td>";
    myTable += "<td class='bt btf btm'>" + items[i].messageText+ "</td>";
    myTable += "<td> <button class='updateSend' onclick='sendReg(" + items[i].idMessage + ")'>Edit</button><br><button class='updateSend' onclick='updateInf(" +  items[i].idMessage + ") '>Update</button>";
    myTable += "<td> <button class='delete' onclick='deleteInf(" + items[i].idMessage + ")'>Delete</button>";
    myTable += "</tr>";
    myTable += "<tr> </tr>";
  }
  myTable += "</table>";
  $("#resultado").html(myTable);

}

function saveInf() {
  if (validateFields()) {
    let myData = {
      client: { idClient: +$("#client_id").val() },
      motorbike: { id: +$("#motorbike_id").val() },
      messageText: $("#messagetext").val(),
    };
    let dataToSend = JSON.stringify(myData);
    console.log(myData);
    $.ajax({
      url: urlRest + "save",
      type: "POST",
      data: dataToSend,
      datatype: "JSON",
      contentType: "application/JSON; charset=utf-8",
      success: function (respuesta) {
        console.log(respuesta);
        $("#resultado").empty();
        $("#client_id").val("");
        $("#motorbike_id").val("");
        $("#messagetext").val("");
        alert("The fields have been saved");
        visualizeInf();
      },

      error: function (jqXHR, textStatus, errorThrown) {
        alert("The fields have not been saved");
        visualizeInf();
      },
    });
  }
}

function updateInf(idElemento) {
  if (validateFields()) {
  let myData = {
    idMessage:idElemento,
    client: { idClient: +$("#client_id").val() },
    motorbike: { id: +$("#motorbike_id").val() },
    messageText: $("#messagetext").val(),
  };
  console.log(myData);
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: urlRest + "update",
    type: 'PUT',
    data: dataToSend,
    contentType: "application/JSON;",
    datatype: 'JSON',
    success: function (respuesta) {
      console.log(respuesta);
      $("#resultado").empty();
      $("#client_id").val("");
      $("#motorbike_id").val("");
      $("#messagetext").val("");
      alert("The fields have been updated");
      visualizeInf();
    },
  });
};
}

function deleteInf(idElemento) {
  if (
    $("#client_id").val().length != 0 ||
    $("#motorbike_id").val().length != 0 ||
    $("#messagetext").val().length != 0
  ) {
    $("#client_id").val("");
    $("#motorbike_id").val("");
    $("#messagetext").val("");
  }
  let myData = {
    idMessage:idElemento,
  };
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: urlRest + idElemento,
    type: "DELETE",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta), 
      $("#resultado").empty();
      visualizeInf();
      alert("The fields have been removed");
    },
  });
}

function sendReg(idElemento) {
  $.ajax({
    url: urlRest + idElemento,
    type: 'GET',
    success: function (respuesta) {
      console.log(respuesta);
      $("#client_id").val(respuesta.client.idClient);
      $("#motorbike_id").val(respuesta.motorbike.id);
      $("#messagetext").val(respuesta.messageText);
    },
  });
}

function validateFields() {
  if ($("#client_id").val() == "") {
    alert("Client is Empty!");
    $("#client_id").focus();
    return false;
  } else {
    if ($("#motorbike_id").val() == "") {
      alert("Motorbike is Empty!");
      $("#motorbike_id").focus();
      return false;
    } else {
      if ($("#messagetext").val() == "") {
        alert("Message Text is Empty!");
        $("#messagetext").focus();
        return false;
      } else {
        return true;
      }
    }
  }
}

function selectIdClient(){
  console.log("Se esta ejecutando")
  $.ajax({
      url: urlClient,
      type: 'GET',
        datatype: 'JSON',
      success:function(respuesta){
          console.log(respuesta);
          let $select = $("#client_id");
          $.each(respuesta, function (id, name) {
            $select.append('<option class="opt" value='+name.idClient+' >'+name.name+'</option>');
          }); 
      }
  
  })
}

function selectIdMotorbike(){
  console.log("Se esta ejecutando")
  $.ajax({
      url: urlMotorbike,
      type: 'GET',
        datatype: 'JSON',
      success:function(respuesta){
          console.log(respuesta);
          let $select = $("#motorbike_id");
          $.each(respuesta, function (id, name) {
            $select.append('<option class="opt" value='+name.id+' >'+name.name+'</option>');
          }); 
      }
  
  })
}

$(document).ready(function () {
  $("#limpiar").click(function () {
    $('select[id="client_id"], select[id="motorbike_id"], textarea[type="text"]').val("");
  });
});