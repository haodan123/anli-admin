<!-- 刷新的时候跳转到该路由,然后再跳转回去 -->

<script>
  import {
    defineComponent
  } from 'vue';
  import {
    useRoute,
    useRouter
  } from 'vue-router';

  export default defineComponent({
    created() {
      const route = useRoute()
      const router = useRouter()
      const {
        params,
        query
      } = route
      const {
        path
      } = params
      console.log(params, query);
      router.replace({
        path: `/${path}`,
        query
      }).catch((err) => {
        console.log(err);
      })
    },
    render() {

    }
  })
</script>
<!-- <template>
  <div>

  </div>
</template>

<script setup>
  import {
    onMounted
  } from 'vue';
  import {
    useRoute,
    useRouter
  } from 'vue-router';
  console.log('path', 1111);
  const route = useRoute()
  const router = useRouter()
  const {
    params,
    query
  } = route
  const {
    path
  } = params
  console.log(params, query);
  router.replace({
    path: `/${path}`,
    query
  }).catch((err) => {
    console.log(err);
  })
  onMounted(() => {

  })
</script>

<style scoped>

</style> -->