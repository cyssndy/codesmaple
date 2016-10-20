
$("#MyButton").click(function () {
    var person = {};
    person.Name = $("#Form-Name").val();
    person.Age = $("#Form-Age").val();
    var jsonObj = {};
    jsonObj.person = person;
    jsonObj.method = "search";
    $.ajax({
        method: "POST",
        contentType: "application/JSON; charset=utf-8",
        url: "Default.aspx/SearchPeople",
        data: JSON.stringify(jsonObj),
        success: function (data) {
            console.log(data.d);
        },
        error: function (data) {
            alert("ajax error");
            console.log(data.d);
        }
    });
});