var me= {
  name : "xxx",
  lastName : "xxx",
  address : {
    work : "xxxx",
    home : "xxxx"
  },
  phoneNumbers : {
    mobile : "xxx",
    work : {
      number : "xxx",
      extension: "xxx"
    }
  }
};

$("#submitMaster").click(function() {
  me.name= $("#first_name").val();
  me.lastName= $("#lastName").val();
  me.address.work= $("#work_address").val();
  me.address.home= $("#home_address").val();
  me.phoneNumbers.mobile= $("#mobile_number").val();
  me.phoneNumbers.work.number= $("#work_number").val();
  me.phoneNumbers.work.extension= $("#work_number_extension").val();
  // console.log(me);
  // console.log("Work Number: " + me.phoneNumbers.work.number + " Ext. " + me.phoneNumbers.work.extension);
  // console.log(me.phoneNumbers.work.number);
  // console.log(me.phoneNumbers.work.extension);
  // Put the object into storage
  localStorage.setItem('me', JSON.stringify(me));

  // Retrieve the object from storage
  var retrievedObject = localStorage.getItem('me');

  console.log('retrievedObject: ', JSON.parse(retrievedObject));
  console.log("Work Number: " + JSON.parse(retrievedObject).phoneNumbers.work.number + " Ext. " + JSON.parse(retrievedObject).phoneNumbers.work.extension);
});

$("#loadMaster").click(function() {

  // Retrieve the object from storage
  var retrievedObject = JSON.parse(localStorage.getItem('me'));
  console.log(retrievedObject);

  $("#first_name").val(retrievedObject.name);
  $("#lastName").val(retrievedObject.lastName);
  $("#work_address").val(retrievedObject.address.work);
  $("#home_address").val(retrievedObject.address.home);
  $("#mobile_number").val(retrievedObject.phoneNumbers.mobile);
  $("#work_number").val(retrievedObject.phoneNumbers.work.number);
  $("#work_number_extension").val(retrievedObject.phoneNumbers.work.extension);

});

$("#clearMaster").click(function() {

  $("#first_name").val("");
  $("#lastName").val("");
  $("#work_address").val("");
  $("#home_address").val("");
  $("#mobile_number").val("");
  $("#work_number").val("");
  $("#work_number_extension").val("");

});