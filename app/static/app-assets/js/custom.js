function show_notifications() {
    console.log("clicked...");
    var ul_notifications = document.getElementById("ul_notifications");
    if (ul_notifications.className === "dropdown-menu dropdown-menu-media dropdown-menu-right") {
        ul_notifications.className = "dropdown-menu dropdown-menu-media dropdown-menu-right show";
    }
    else if (ul_notifications.className === "dropdown-menu dropdown-menu-media dropdown-menu-right show") {
        ul_notifications.className = "dropdown-menu dropdown-menu-media dropdown-menu-right";
    }
}

function setup() {
    document.getElementById('btn_upload').addEventListener('click', openDialog);
    function openDialog() {
        document.getElementById('uploadImage').click();
    }
}

function openUserMenu() {
    user_dropdown = document.getElementById("user_dropdown");
    if (user_dropdown.className === "dropdown-menu dropdown-menu-right pb-0") {
        user_dropdown.className = "dropdown-menu dropdown-menu-right pb-0 show";
    }
    else if (user_dropdown.className === "dropdown-menu dropdown-menu-right pb-0 show") {
        user_dropdown.className = "dropdown-menu dropdown-menu-right pb-0";
    }    
}

function like(post_id) {
    var p_likes = document.getElementById("p_likes");
    var p_unlikes = document.getElementById("p_unlikes");
    $.post('/like', {
        post_id: post_id
    }).done(function(response) {
        console.log(response['likes']);
        p_likes.innerHTML = response['likes'];
        p_unlikes.innerHTML = response['unlikes'];
    }).fail(function() {
        
    });
}

function unlike(post_id) {
    var p_unlikes = document.getElementById("p_unlikes");
    var p_likes = document.getElementById("p_likes");
    $.post('/unlike', {
        post_id: post_id
    }).done(function(response) {
        console.log(response['unlikes']);
        p_unlikes.innerHTML = response['unlikes'];
        p_likes.innerHTML = response['likes'];
    }).fail(function() {
        
    });
}


function focus_text_area(){
    var user_comment_textarea = document.getElementById("user-comment-textarea");
    user_comment_textarea.focus();
}


function Comment(post_id) {
    var user_comment = document.getElementById("user-comment-textarea").value;
    $.post('/comment', {
        user_comment: user_comment,
        post_id: post_id
    }).done(function(response){

    })
}