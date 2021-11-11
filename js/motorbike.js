var urlRest = 'http://129.159.58.143:8080/api/Motorbike/'; 
var urlCategory = "http://129.159.58.143:8080/api/Category/all";
/* 
var urlRest = 'http://localhost:8080/api/Motorbike/';
var urlCategory = "http://localhost:8080/api/Category/all"; */

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
  myTable += "<td class='bt sty bsi'>   Name </td>";
  myTable += "<td class='bt sty'>       Brand </td>";
  myTable += "<td class='bt sty'>       Year </td>";
  myTable += "<td class='bt sty'>       Description </td>";
  myTable += "<td class='bt sty btf'>   Category </td>";
  myTable += "<td class='btu'>       Update </td>";
  myTable += "<td class='btd'>       Delete </td>";
  myTable += "</tr>";
  myTable += "<tr class='tr'></tr>";
  myTable += "</div>";

  for (i = 0; i < items.length; i++) {
    myTable += "<tr>";
    myTable += "<td class='bt bti'>" +  items[i].name + "</td>";
    myTable += "<td class='bt'>" +      items[i].brand + "</td>";
    myTable += "<td class='bt'>" +      items[i].year + "</td>";
    myTable += "<td class='bt'>" +      items[i].description + "</td>";
    myTable += "<td class='bt btf'>" +  items[i].category.name + "</td>";
    myTable += "<td> <button class='updateSend' onclick='sendReg(" + items[i].id + ") '>Edit</button>                     <br>                                                                  <button class='updateSend' onclick='updateInf(" + items[i].id + ") '>Update</button>";
    myTable += "<td> <button class='delete' onclick='deleteInf(" + items[i].id + ")'>Delete</button>";
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
      brand: $("#brand").val(),
      year: $("#year").val(),
      category: { id: +$("#category_id").val() },
      description: $("#description").val(),
    };
    let dataToSend = JSON.stringify(myData);
    console.log(myData);

    $.ajax({
      url: urlRest + "save",
      type: 'POST',
      data: dataToSend,
      datatype: 'JSON',
      contentType: "application/JSON; charset=utf-8",
      success: function (respuesta) {
        console.log(respuesta);
        $("#resultado").empty();
        $("#name").val("");
        $("#brand").val("");
        $("#year").val("");
        $("#category_id").val("");
        $("#description").val("");
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
  if (validateFields()) {
    let myData = {
      id: idElemento,
      name: $("#name").val(),
      brand: $("#brand").val(),
      year: $("#year").val(),
      category: { id: +$("#category_id").val() },
      description: $("#description").val(),
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
        $("#brand").val("");
        $("#year").val("");
        $("#category_id").val("");
        $("#description").val("");
        alert("The fields have been updated");
        visualizeInf();
      },
    });
  };
}

function deleteInf(idElemento) {
  if (
    $("#name").val().length != 0 ||
    $("#brand").val().length != 0 ||
    $("#description").val().length != 0
  ) {
    $("#name").val("");
    $("#brand").val("");
    $("#year").val("");
    $("#category_id").val("");
    $("#description").val("");
  }
  let myData = {
    id: idElemento,
  };
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: urlRest + idElemento,
    type: "DELETE",
    data: dataToSend,
    contentType: "application/JSON;",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta), $("#resultado").empty();
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
      $("#name").val(respuesta.name);
      $("#brand").val(respuesta.brand);
      $("#year").val(respuesta.year);
      $("#description").val(respuesta.description); 
      $("#category_id").val(respuesta.category.id);
    },
  });
}

function validateFields() {
  if ($("#name").val() == "") {
    alert("Name is Empty!");
    $("#name").focus();
    return false;
  } else {
    if ($("#brand").val() == "") {
      alert("Brand is Empty!");
      $("#brand").focus();
      return false;
    } else {
      if ($("#year").val() == "") {
        alert("Year is Empty!");
        $("#year").focus();
        return false;
      } else {
        if ($("#description").val() == "") {
          alert("Description is Empty!");
          $("#description").focus();
          return false;
        } else {
          return true;
        }
      }
    }
  }
}
  
function selectIdCategory(){
    console.log("Se esta ejecutando")
    $.ajax({
        url: urlCategory,
        type: 'GET',
        datatype: 'JSON',
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#category_id");
            $.each(respuesta, function (id, name) {
              $select.append('<option class="opt" value='+name.id+' >'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}

$(document).ready(function () {
  $("#limpiar").click(function () {
    $('input[type="number"], input[type="text"], select[id="category_id"], textarea[type="text"]').val("");
  });
});


