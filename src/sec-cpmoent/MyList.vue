<template>
  <div>
      <ul >
          <li v-for="item in list" :key="item.id">
                {{item.title}}
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name:'MyList',
    props:{
        list:Array,
    }
}
</script>

<style>

</style>