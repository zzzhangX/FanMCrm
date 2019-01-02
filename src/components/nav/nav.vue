<template>
  <div id="app">
    <div class="logo">
      <img src="../../assets/logo.png" alt="">
      <span>梵几</span>
    </div>
    <div class="nav">
      <ul>
        <li>
            <div >
              <router-link to="/index"><i class="iconfont">&#xe747;</i>&nbsp;&nbsp;首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</router-link>
            </div>
        </li>
        <li>
          <div><i class="iconfont">&#xe64a;</i>&nbsp;&nbsp;&nbsp;
            基本管理
          </div>
          <ul>
            <li>
              <router-link to="/users">用户管理</router-link>
            </li>
            <li>

              <router-link to="/dept">部门管理</router-link>
            </li>
            <li>
              <router-link to="/employee">员工管理</router-link>
            </li>
            <li>
              <router-link to="/orderItem">订单管理</router-link>
            </li>
            <li>
              <router-link to="/admin">管理员管理</router-link>
            </li>
            <li>
              <router-link to="/cart">购物车管理</router-link>
            </li>
          </ul>
        </li>
        <li>
          <div>
            <router-link to="/goods"><i class="iconfont">&#xe674;</i>&nbsp;&nbsp;&nbsp;
              商品管理
            </router-link>
          </div>
        </li>
        <li>
          <div>
            <router-link to="/format"><i class="iconfont">&#xe64a;</i>&nbsp;&nbsp;&nbsp;
            规格管理</router-link>
          </div>
        </li>
        <li>
          <div>
            <router-link to="/myxiaoshou"><i class="iconfont">&#xe61f;</i>&nbsp;&nbsp;&nbsp;
              销售管理
            </router-link>
          </div>
        </li>
        <li>
          <div>
            <router-link to="/lanmu"><i class="iconfont">&#xe68a;</i>&nbsp;&nbsp;&nbsp;
              栏&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
$(function () {

  $(".nav>ul>li>div").on("mouseover", function () {
    $(this).css({
      "background-color": "#f9f9f9"
    });
  });
  $(".nav>ul>li>div").on("mouseout", function () {
    $(this).css({
      "background-color": "white"
    });
  });
  $(".nav>ul>li>div").on("click",function () {
      if (parseInt($(this).parent().css("height"))<=50){
        $(this).parent().css({
          "height":$(this).siblings().children().length*30+50+"px",
          "transition":"all .3s linear"
        });

      } else {

        $(this).parent().css({
          "height":"50px",
        });
      }
    $(this).off("mouseout");

    for (var i=0;i<$(this).parent().siblings().length;i++){
      $(this).parent().siblings().eq(i).children().eq(0).css({
        "background-color":"white"
      });
      $(this).parent().siblings().eq(i).children().eq(0).on("mouseout",function () {
        $(this).css({
          "background-color":"white"
        });
      });
    }


    $(".nav>ul>li>ul>li").css({
      "background-color":"white"
    });
    $(".nav>ul>li>ul>li").on("mouseout",function () {
      $(this).css({
        "background-color":"white"
      });
    });
  });

  $(".nav>ul>li>ul>li").on("mouseover",function () {
    $(this).css({
      "background-color":"#ebebef"
    });
  });
  $(".nav>ul>li>ul>li").on("mouseout",function () {
    $(this).css({
      "background-color":"white"
    });
  });
  $(".nav>ul>li>ul>li").on("click",function () {
      $(this).css({
        "background-color":"#ebebef"
      });
      $(this).off("mouseout");
      $(this).siblings().css({
        "background-color":"white"
      }).on("mouseout",function () {
        $(this).css({
          "background-color":"white"
        })
      });



  });

});
  export default {
      name:'mynav',
    data(){
          return{

          }
    },
    methods:{
      test1:function () {
        $(event.target).css({
          "background-color":"#f9f9f9"
        })
      },
      test2:function () {

        $(event.target).css({
          "background-color": "white"
        });
      },
      test3:function () {

        if (parseInt($(event.target).parent().css("height"))<=50){
          $(event.target).parent().css({
            "height":$(event.target).siblings().children().length*30+50+"px",
            "transition":"all .3s linear"
          });
        } else {
          $(event.target).parent().css({
            "height":"50px",
          });
        }
        $(event.target).off("mouseout");
        for (var i=0;i<$(event.target).parent().siblings().length;i++){
          $(event.target).parent().siblings().eq(i).children().eq(0).css({
            "background-color":"white"
          });
          $(event.target).parent().siblings().eq(i).children().eq(0).on("mouseout",function () {
            $(event.target).css({
              "background-color":"white"
            });
          });
        }
        $(".nav>ul>li>ul>li").css({
          "background-color":"white"
        });
        $(".nav>ul>li>ul>li").on("mouseout",function () {
          $(event.target).css({
            "background-color":"white"
          });
        });
      },
      test4:function () {
        $(event.target).css({
          "background-color":"#ebebef"
        });
      },
      test5:function () {
        $(event.target).css({
          "background-color":"white"
        });
      },
      test6:function () {
        $(event.target).css({
          "background-color":"#ebebef"
        });
        $(event.target).off("mouseout");
        $(event.target).siblings().css({
          "background-color":"white"
        }).on("mouseout",function () {
          $(event.target).css({
            "background-color":"white"
          })
        });
      }
    },

  }


</script>
<style scoped>
  @font-face {font-family: "iconfont";
    src: url('../../assets/font_edtgn2sh1ll/iconfont.eot'); /* IE9*/
    src: url('../../assets/font_edtgn2sh1ll/iconfont.eot#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('../../assets/font_edtgn2sh1ll/iconfont.woff') format('woff'), /* chrome, firefox */
    url('../../assets/font_edtgn2sh1ll/iconfont.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url('../../assets/font_edtgn2sh1ll/iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
  }

  .iconfont {
    font-family:"iconfont" !important;
    font-size:20px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    color: #aedaaf;
  }
  a{
    text-decoration: none;
    color: gray;
  }
  #app{
    width:calc(20%);
    height:700px;
    padding: 10px;
    position: fixed;
    left: 0;
    top: 0;
    background-color: white;
  }
  .logo{
    width: 90%;
    margin: 0 auto;
    border-bottom: 1px solid gray;
    padding: 3% 15%;
    color: gray;
    font-size: 20px;
  }
  .logo>img{
    width: 40%;
    height: 40%;
    vertical-align: middle;
    margin-right: 15px;
  }
  .nav{
    width: 100%;
    padding: 10%;
  }
  ul{
    list-style: none;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }
  .nav>ul>li{
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: gray;
    overflow: hidden;
  }
  .nav>ul>li>ul>li{
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
  }
</style>
