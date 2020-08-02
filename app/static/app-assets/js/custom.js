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

function like(post_id, like_post_id, unlike_post_id) {
    var p_likes = document.getElementById(like_post_id);
    var p_unlikes = document.getElementById(unlike_post_id);
    $.post('/like', {
        post_id: post_id
    }).done(function(response) {
        console.log(response['likes']);
        p_likes.innerHTML = response['likes'];
        p_unlikes.innerHTML = response['unlikes'];
    }).fail(function() {
        
    });
}

function unlike(post_id, like_post_id, unlike_post_id) {
    var p_unlikes = document.getElementById(unlike_post_id);
    var p_likes = document.getElementById(like_post_id);
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
        location.reload(true);
        document.getElementById("btn_post_comment").focus();
    })
}

function reveal_aboutMe_editor(){
    document.getElementById("txt_about_me").style.display = "block";
    document.getElementById("btn_post_aboutMe").style.display = "block";
    document.getElementById("anch_add_bio").style.display = "none";
}

function Post_aboutMe(){
    var about_me = document.getElementById("txt_about_me").value;
    var p_aboutme = document.getElementById("p_aboutme");
    console.log(p_aboutme);
    $.post('/edit_profile', {
        about_me: about_me
    }).done(function(response) {
        document.getElementById("txt_about_me").style.display = "none";
        document.getElementById("btn_post_aboutMe").style.display = "none";
        console.log(response['text']);
        p_aboutme.innerHTML = about_me;
        p_aboutme.style.display = "block";        
    }).fail(function() {
        
    });    
}

function add_location(){
    var anchr_add_location = document.getElementById("anchr_add_location");
    var txt_location = document.getElementById("txt_location");
    anchr_add_location.style.display = "none";
    txt_location.style.display = "block";
}