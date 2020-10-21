function show_notifications() {
    var ul_notifications = document.getElementById("ul_notifications");
    if (ul_notifications.className === "dropdown-menu dropdown-menu-media dropdown-menu-right") {
        ul_notifications.className = "dropdown-menu dropdown-menu-media dropdown-menu-right show";
    } else if (ul_notifications.className === "dropdown-menu dropdown-menu-media dropdown-menu-right show") {
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
    } else if (user_dropdown.className === "dropdown-menu dropdown-menu-right pb-0 show") {
        user_dropdown.className = "dropdown-menu dropdown-menu-right pb-0";
    }
}

function like(post_id, like_post_id, unlike_post_id) {
    var p_likes = document.getElementById(like_post_id);
    var p_unlikes = document.getElementById(unlike_post_id);
    $.post('/like', {
        post_id: post_id
    }).done(function (response) {
        p_likes.innerHTML = response['likes'];
        p_unlikes.innerHTML = response['unlikes'];
    }).fail(function () {

    });
}

function unlike(post_id, like_post_id, unlike_post_id) {
    var p_unlikes = document.getElementById(unlike_post_id);
    var p_likes = document.getElementById(like_post_id);
    $.post('/unlike', {
        post_id: post_id
    }).done(function (response) {
        p_unlikes.innerHTML = response['unlikes'];
        p_likes.innerHTML = response['likes'];
    }).fail(function () {

    });
}


function focus_text_area(focus, post_id) {
    var user_comment_textarea = document.getElementById(focus + post_id);
    console.log(document.getElementById("dv_comment_" + post_id).style.display);
    if (document.getElementById("dv_comment_" + post_id).style.display == "none") {
        document.getElementById("dv_comment_" + post_id).style.display = "block";
    }
    else if (document.getElementById("dv_comment_" + post_id).style.display == "block") {
        document.getElementById("dv_comment_" + post_id).style.display = "none";
    }
    user_comment_textarea.focus();
}


function Comment(comment_input_id, post_id) {
    var user_comment = document.getElementById(comment_input_id).value;
    $.post('/comment', {
        user_comment: user_comment,
        post_id: post_id
    }).done(function (response) {
        document.getElementById("p_temp_body").innerHTML = user_comment;
        document.getElementById("dv_temp").style.display = "block";
        document.getElementById(comment_input_id).value = "";
    })
}

function reveal_aboutMe_editor() {
    document.getElementById("txt_about_me").style.display = "block";
    document.getElementById("btn_post_aboutMe").style.display = "block";
    document.getElementById("anch_add_bio").style.display = "none";
    document.getElementById("p_jinja_about_me").style.display = "none";
}

function editbio() {
    document.getElementById("btn_editbio").style.setProperty("display", "none", "important");
    document.getElementById("txt_about_me").value = document.getElementById("p_jinja_about_me").innerHTML;
    document.getElementById("txt_about_me").style.display = "block";
    document.getElementById("btn_post_aboutMe").style.display = "block";
    document.getElementById("p_jinja_about_me").style.display = "none";
    if (document.getElementById("p_aboutme") !== null) {
        document.getElementById("p_aboutme").style.display = "none";
    }
}

function Post_aboutMe() {
    document.getElementById("btn_editbio").style.setProperty("display", "block", "important");
    var about_me = document.getElementById("txt_about_me").value;
    var p_aboutme = document.getElementById("p_aboutme");
    $.post('/edit_profile', {
        about_me: about_me
    }).done(function (response) {
        document.getElementById("txt_about_me").style.display = "none";
        document.getElementById("btn_post_aboutMe").style.display = "none";
        p_aboutme.innerHTML = about_me;
        p_aboutme.style.display = "block";
    }).fail(function () {

    });
}

function add_location() {
    var anchr_add_location = document.getElementById("anchr_add_location");
    var txt_location = document.getElementById("txt_location");
    anchr_add_location.style.display = "none";
    txt_location.style.display = "block";
}

function edit_info() {
    var modal_editInfo = document.getElementById("modal_editInfo");
    modal_editInfo.className = "modal fade text-left show";
    modal_editInfo.style.display = "none";
    var modalbackdrop = document.getElementById("modalbackdrop");
    modalbackdrop.className = "modal-backdrop fade show";
}

function close_modal(modal_id) {
    modal = document.getElementById(modal_id);
    modal.className = "modal fade text-left";
    modal.style.display = "none";
    var modalbackdrop = document.getElementById("modalbackdrop");
    modalbackdrop.className = "modal-backdrop fade";
    modalbackdrop.style.display = "none";
}

function follow(username) {
    $.post('/follow', {
        username: username
    }).done(function (response) {
        if (response['message'] === "You are now following " + username + "!") {
            if (document.title == "Explore - Hikanotes") {
                var follow_btn = "follow-btn" + username
                document.getElementById(follow_btn).style.setProperty("display", "none", "important");
                alert("You are now following " + username + "!");
                document.getElementById("a_following").innerHTML = response['following'];
            }
            else {
                document.getElementById("unfollow-btn").style.setProperty("display", "block", "important");
                document.getElementById("dv_alert").style.display = "block";
                document.getElementById("unfollow-btn").style.cursor = "pointer";
                document.getElementById("a_followers").innerHTML = response['followers'];
                document.getElementById("dv_alert").innerHTML = response['message'];
            }

        } else {
            document.getElementById("dv_alert").style.display = "block";
            document.getElementById("dv_alert").innerHTML = response['message'];
        }
    }).fail(function () {

    });
}

function start_chat(username) {
    $.post('/chats', {
        username: username
    }).done(function (response) {

    }).fail(function () {

    });
}

function post_chat(input_id, username) {
    var chat_message = document.getElementById(input_id).value;
    $.post('/send_chat', {
        chat_message: chat_message,
        username: username        
    }).done(function (response) {
        console.log(response['message'], response['username']);
    })

}