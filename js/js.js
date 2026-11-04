$(function () {
    let islog = false;
    const app = {
        toast(message, type = "success", delay = 4000) {
            const all = ["success", "danger", "secondary", "warning", "primary"];
            const ait = all.includes(type) ? type : "success";
            let $box = $(".app-t");
            if (!$box.length) {
                 $box = $(`    <div class="app-t pf z-max bottom-0 start-0 ms-md-5 ms-2 p-3 mb-2"></div>`).appendTo("body");
            }
            const $t = $(`
                <div class="toast text-bg-${ait} d-fxcc jcs my-1">
    <div class="toast-body"></div>
    <div class="m-auto me-2">
        <button class="btn-close" data-bs-dismiss="toast"></button>
    </div>
</div>
                `).appendTo($box);
            $t.find(".toast-body").html(message);
            const newtoast = new bootstrap.Toast($t[0], delay);
            $t.one("hidden.bs.toast", () => $t.remove());
            newtoast.show();
        }
    };
    function rlog() {
        if (islog) {
            return true;
        }
        app.toast('請先登入會員，才能使用這個功能。      <button class="btn toastlogin rounded-pill bg-c0 " data-bs-dismiss="toast">一鍵登入</button>', "danger");
    }
    function setlog(loggedIn) {
        islog = loggedIn;
        $("#aimsg,#aibtnmsg").prop("disabled", !loggedIn);
        if (!loggedIn) {
            $("#aimsg").val("");
        }
        $("#aimsg").attr("placeholder", loggedIn ? "請輸入訊息" : "請先登入會員");
        const $logbtn = $(".logbtn");
        if (loggedIn) {
            $logbtn.removeClass("bg-c1").addClass("bg-success").html('<i class="fa-solid fa-user me-1"></i>登出');
            app.toast("歡迎登入，您可以進行留言或報名", "success");
            $("#user").modal("show");
        } else {
            $logbtn.removeClass("bg-success").addClass("bg-c1").html('<i class="fa-solid fa-user me-1"></i>登入');
            app.toast("您以登出，期待下次再見", "secondary");
        }
    }
    $(".logbtn").on("click", function () {
        if (islog) {
            setlog(false);
            return;
        }
        setlog(true);
    });
    $(document).on("click", ".toastlogin", function () {
        setlog(true);
    });
    $(window).on("scroll", function () {
        const $h = $(".header");
        const a = this.scrollY > 10;
        const aa = this.scrollY > 500;
        $h
            .toggleClass("a1", a)
            .toggleClass("a2", !a);
        if (aa) {
            $(".top").fadeIn(500);
        } else {
            $(".top").fadeOut(500);

        }
    }).trigger("scroll");

function r() {
    $(".resveal , .resveal1 , .resveal2 , .resveal21 , .resveal3 , .resveal31 , .resveal01 ").each(function () {
        const tot=$(this).offset().top;
        const wstwh=$(window).scrollTop()+$(window).height();
        if (tot<wstwh-40) {
            $(this).addClass("r-show");
        } else {
            $(this).removeClass("r-show");            
        }
    });
}
$(window).on("scroll load",r)

$(".addbuy").on("click",function () {
    if (!rlog()) {
        return;
    }
    $("#buyyes").modal("show");
});

    const md = [
        {
            name: "台北周杰倫",
            text: "多元友善",
            likes: 504
        },
        {
            name: "台南五佰",
            text: "有些差異不容易被看見",
            likes: 500
        },
        {
            name: "台東五月天",
            text: "願意理解彼此的需要",
            likes: 1096
        },
        {
            name: "台東鄧紫棋",
            text: "讓環境更貼近不同人的生活",
            likes: 684
        },
    ];
    const $name = $("#name");
    const $text = $("#text");
    const $msgs = $(".msgs");
    function esh(text) {
        return $("<div>").text(text).html();
    }
    function ct(data) {
        const hn = data.name.charAt(0);
        const left = Math.floor(Math.random() * 80) + "%";
        const move = Math.floor(Math.random() * 80) + "px";
        const time = Math.floor(Math.random() * 20) + 5 + "s";
        const $msgbox = $(`
    <div class="msg card pa rounded-4 shadow p-3" style="
    --left:${left};
    --move:${move};
    --time:${time};
    ">
        <div class="d-fxcc jcs">
            <div class="bg-gra rounded-pill shadow d-fxcc" style="width: 40px;height: 40px;">
                ${hn}
            </div>
            <div class="px-2">
                <div class="fw-bolder">${esh(data.name)}</div>
                <div class="" style="transform: scale(0.8);">剛剛</div>
            </div>
        </div>
        <div class="t-bt">
            ${esh(data.text)}
        </div>
        <div class="d-fxcc jce">
            <button class="btn border-0 t-bt like">
                <span>${esh(data.likes)}</span>
                <i class="fa-solid fa-heart"></i>
            </button>
        </div>
    </div>            
            `);
        $msgs.append($msgbox);
        $msgbox.one("animationend", function () {
            $(this).remove();
        });
    };
    md.forEach(function (message, index) {
        setTimeout(() => {
            ct(message);
        }, index * 700);
    });
    setInterval(() => {
        const ran = md[Math.floor(Math.random() * md.length)];
        ct({
            name: ran.name,
            text: ran.text,
            likes: ran.likes
        });
    }, 1000);
    function msg() {
        if (!rlog()) {
            return;
        }
        const name = $name.val().trim();
        const text = $text.val().trim();
        let v = true;
        if (!name) {
            $name.addClass("is-invalid");
            v = false;
        } else {
            $name.removeClass("is-invalid");
        }
        if (!text) {
            $text.addClass("is-invalid");
            v = false;
        } else {
            $text.removeClass("is-invalid");
        }
        if (!v) {
            return;
        }
        const newmsg = {
            name: name,
            text: text,
            likes: 0
        };
        md.push(newmsg);
        ct(newmsg);
        $name.val("");
        $text.val("");
        $("#cardmsg").collapse("hide");
    }
    $name.keypress(function (e) {
        if (e.which === 13) {
            $text.focus();
        }
    });
    $text.keypress(function (e) {
        if (e.which === 13) {
            msg();
        }
    });
    $(".msgbtn").on("click", function () {
        msg();
    });
    $msgs.on("click", ".like", function () {
        const $btn = $(this);
        const $num = $btn.find("span");
        let num = parseInt($num.text(), 10);
        if ($btn.hasClass("t-r")) {
            $btn.toggleClass("t-r t-bt");
            num--;
        } else {
            num++;
            $btn.toggleClass("t-r t-bt fa-bounce");
            setTimeout(() => {
                $btn.removeClass("fa-bounce");
            }, 1000);
        }
        $num.text(num);
    });
    $(".msgcard").on("click", function () {
        if (!rlog()) {
            return;
        }
    });

    $(".aibtn").on("click",function () {
       if (!rlog()) {
        return;
       } 
       app.toast("這個AI功能維修中，暫時無法使用","warning");
    });

    let ac=0;
    const $cards=$(".card3d");
    const cs=$cards.length;
    function card3d() {
        $cards.each(function () {
            const $card=$(this);
            const card=$card.data("in");
            let o =card-ac;
            if (o<-2) {
                o+=cs;
            }
            if (o>2) {
                o-=cs;
            }
            if (o===2) {
                $card.css({
    "transform":" translate3d(100%,0,0) scale(0.5) rotateY(-55deg)",
    "opacity": "0.3",
    "z-index": "1",                    
                });                
            }
            else if (o===1) {
                $card.css({
    "transform":" translate3d(50%,0,0) scale(0.7) rotateY(-35deg)",
    "opacity": "0.6",
    "z-index": "2",                    
                });                
                
            }
            else if (o===0) {
                $card.css({
    "transform":" translate3d(0%,0,0) scale(1) rotateY(0deg)",
    "opacity": "1",
    "z-index": "5",                    
                });                
                
            }
            else if (o===-1) {
                $card.css({
    "transform":" translate3d(-50%,0,0) scale(0.7) rotateY(35deg)",
    "opacity": "0.6",
    "z-index": "2",                    
                });                
                
            }
            else if (o===-2) {
                
                $card.css({
    "transform":" translate3d(-100%,0,0) scale(0.5) rotateY(55deg)",
    "opacity": "0.3",
    "z-index": "1",                    
                });                
            }
            else {
                
                $card.css({
    "transform":" translate3d(0%,0,0) scale(0) rotateY(0deg)",
    "opacity": "0",
    "z-index": "0",                    
                });                
            }
        });
    }
    card3d();
    $("#btn3dprev").on("click",function () {
        ac=(ac+1)%cs;
        card3d();
    });
    $("#btn3dnext").on("click",function () {
        ac=(ac-1)%cs;
        card3d();
    });
});