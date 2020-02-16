<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <div class="card-body">
            <h4>{{blog.title}}</h4>
            <p>
              {{blog.description}}
            </p>
            <nuxt-link to="/crud">
              <button class="btn btn-primary">Back</button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase'

export default {
  async mounted() {
    const { id } = this.$route.params
    const ref = fireDb.collection('blog').doc(id)
    try {
      let data = await ref.get()
      this.blog = data.data()
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      blog: {}
    }
  }
}
</script>

<style></style>
