<template>
  <transition name="modal-fade">
  <div id="app" class="modal-backdrop" @click="close" v-show="show">
    <div class="modal" @click.stop role="dialog" aria-labelledby="modalTile" arial-describedby="modalDescription">
      <div class="modal-header" id="modalTitle">
        <slot name="header">
          <h2>这是Modal弹框的标题</h2>
          <div class="btn-close" @click="close" aria-label="Close modal">x</div>
        </slot>
      </div>
      <div class="modal-body" id="modalDescription">
        <slot name="body"> 这是Modal弹框的主体 </slot>
      </div>
      <div class="modal-footer">
      <slot name="footer"> 这是Modal弹框的脚部 <button type="button" class="btn" @click="close" aria-label="Close modal">关闭</button>
      </slot>
    </div>
    </div>
  </div>
  </transition>
</template>
<script>
  export default {
    name: 'Modal',
    data () {
      return { }
      },
    methods: {
      close: function () {
        this.$emit('close');
      }
    }
  }
</script>
<style scoped>
  .modal-fade-enter, .modal-fade-leave-active {
    opacity: 0;
  }
  .modal-fade-enter-active, .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
  .modal-backdrop {
    position: fixed;
    overflow-y:hidden;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(0,0,0,.3);
    display: flex;
    justify-content:center;
    align-items: center;
  }
  .modal {
    position: relative;
    background-color: #fff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x:auto;
    display: flex;
    border-radius: 10px;
    flex-direction: column;
  }
  .modal-header, .modal-footer {
    background-color: #E7E9BE;
    color:  white;
    display: flex;
  }
  .modal-header {
    padding-left: 15px;
    justify-content: space-between;
  }
  .modal-footer {
    padding-top: 15px;
    padding-bottom: 15px;
    justify-content: flex-end;
  }
  .modal-body {
    position: relative;
    padding: 20px 20px;
  }
  .btn-close {
    position: absolute;
    top: 0px;
    right: 15px;
    font-size: 42px;
    cursor: pointer;
    color:white;
    background-color: #E7E9BE;
  }
  .btn {
    color: #fff;
    background-color: #4aae9b;
    border: 1px solid #4aae9b;
    border-radius: 2px;
  }
</style>
