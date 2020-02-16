<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <div class="card-body">
            <h3>Edit</h3>
            <form action="" method="POST" @submit.prevent="submit">
              <div class="form-group">
                <label for="">Title</label>
                <input
                  type="text"
                  class="form-control"
                  name="title"
                  :value="blog.title"
                />
              </div>
              <div class="form-group">
                <label for="">Type</label>
                <select name="type" id="" class="form-control">
                  <option value="code" :selected="blog.type == 'code'"
                    >Code</option
                  >
                  <option value="blog" :selected="blog.type == 'blog'"
                    >Blog</option
                  >
                </select>
              </div>
              <div class="form-group">
                <label for="">Description</label>
                <textarea
                  class="form-control"
                  name="description"
                  :value="blog.description"
                ></textarea>
              </div>
              <div class="form-group">
                <nuxt-link to="/crud">
                  <button class="btn btn-primary" type="button">Back</button>
                </nuxt-link>
                <button class="btn btn-success" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase'

export default {
  data() {
    return {
      blog: {}
    }
  },
  async mounted() {
    const { id } = this.$route.params
    const ref = fireDb.collection('blog').doc(id)
    let data = {}
    try {
      let res = await ref.get()
      data = res.data()
      data.id = res.id
    } catch (error) {
      console.log(error)
    }
    this.blog = data
  },
  methods: {
    async submit(e) {
      let data = {
        id: this.blog.id,
        title: e.target.title.value,
        description: e.target.description.value,
        type: e.target.type.value
      }
      const ref = fireDb.collection('blog').doc(data.id)
      try {
        await ref.set(data)
        alert('submitted')
        this.$router.push('/crud')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style></style>
