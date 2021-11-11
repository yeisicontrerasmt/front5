var urlRest = 'http://129.159.58.143:8080/api/Client/';
/* var urlRest = 'http://localhost:8080/api/Client/'; */

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
    }
  });
}

function visualizeTable(items) {
  let myTable = "<table>";
  myTable += "<div";
  myTable += "<tr>";
  myTable += "<td class='bt sty bsi '>  Name </td>";
  myTable += "<td class='bt sty'>       Email </td>";
  myTable += "<td class='bt sty'>       Age </td>";
  myTable += "<td class='bt sty btf'>   Password </td>";
  myTable += "<td class='btu'>       Update </td>";
  myTable += "<td class='btd'>       Delete </td>";
  myTable += "</tr>";
  myTable += "<tr class='tr'></tr>";
  myTable += "</div>";

  for (i = 0; i < items.length; i++) {
    myTable += "<tr>";
    myTable += "<td class='bt bti'>" +  items[i].name + "</td>";
    myTable += "<td class='bt'>" +      items[i].email + "</td>";
    myTable += "<td class='bt'>" +      items[i].age + "</td>";
    myTable += "<td class='bt btf'>" +  items[i].password + "</td>";
    myTable += "<td> <button class='updateSend' onclick='sendReg(" + items[i].idClient + ") ' id='updateSendBt'>Edit</button>                     <br>                                                                  <button class='updateSend' onclick='updateInf(" + items[i].idClient + ") '>Update</button>";
    myTable += "<td> <button class='delete' onclick='deleteInf(" + items[i].idClient + ")'>Delete</button>";
    myTable += "</tr>";
    myTable += "<tr> </tr>";
  }

  myTable += "</table>";
  $("#resultado").html(myTable);
}

function saveInf() {
  if (validateFields()) {
  let myData = {
    name: $("#name").val(),
    email: $("#email").val(),
    age: $("#age").val(),
    password: $("#password").val(),
  };
  let dataToSend = JSON.stringify(myData);
  console.log(myData);

  $.ajax({
    url: urlRest + "save",
    type: 'POST',
    data: dataToSend,
    datatype: 'JSON',
    contentType: "application/json; charset=utf-8",
    success: function (respuesta) {
      console.log(respuesta);
        $("#resultado").empty();
        $("#name").val("");
        $("#email").val("");
        $("#age").val("");
        $("#password").val("");
        alert("The fields have been saved");
        visualizeInf();
    },

    error: function(jqXHR, textStatus, errorThrown) {
      alert("The fields have not been saved");
      visualizeInf();
    }, 

  });
};
}

function updateInf(idElemento) {
  /* if ($("#name").val() == "" && $("#email").val() == "" && $("#age").val() == "" && $("#password").val() == "" ) {
    alert("You must fill in the fields or submit them with edit."); */
  if (validateFields()) {
    let myData = {
      idClient: idElemento,
      name: $("#name").val(),
      email: $("#email").val(),
      age: $("#age").val(),
      password: $("#password").val(),
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
        $("#name").val("");
        $("#email").val("");
        $("#age").val("");
        $("#password").val(""), 
        alert("The fields have been updated");
        visualizeInf();
      },
    });
  };
/* }; */
}

function deleteInf(idElemento) {
  if (
    $("#name").val().length != 0 ||
    $("#email").val().length != 0 ||
    $("#age").val().length != 0 ||
    $("#password").val().length != 0
  ) {
    $("#name").val("");
    $("#email").val("");
    $("#age").val("");
    $("#password").val("");
  }
  let myData = {
    idClient: idElemento,
  };
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: urlRest + idElemento,
    type: "DELETE",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta), $("#resultado").empty();
      alert("The fields have been removed");
      visualizeInf();
    },
  });
}

function sendReg(idElemento) {
  $.ajax({
    url: urlRest + idElemento,
    type: 'GET',
    success: function (respuesta) {
      console.log(respuesta);
      $("#name").val(respuesta.name);
      $("#email").val(respuesta.email);
      $("#age").val(respuesta.age);
      $("#password").val(respuesta.password);
    },
  });
}

function validateFields() {
  if ($("#name").val() == "") {
    alert("Name is Empty!");
    $("#name").focus();
    return false;
  } else {
    if ($("#email").val() == "") {
      alert("Email is Empty!");
      $("#email").focus();
      return false;
    } else {
      if ($("#age").val() == "") {
        alert("Age is Empty!");
        $("#age").focus();
        return false;
      } else {
        if ($("#password").val() == "") {
          alert("Password is Empty!");
          $("#password").focus();
          return false;
        } else {
          return true;
        }
      }
    }
  }
}

$(document).ready(function () {
  $("#limpiar").click(function () {
    $('input[type="number"], input[type="text"], input[type="password"], input[type="email"]').val("");
  });
});

