<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <div class="card-body">
            <h3>Insert Data</h3>
            <form action="" method="POST" @submit.prevent="submit">
              <div class="form-group">
                <label for="">Title</label>
                <input type="text" class="form-control" name="title" />
              </div>
              <div class="form-group">
                <label for="">Type</label>
                <select name="type" id="" class="form-control">
                  <option value="code">Code</option>
                  <option value="blog">Blog</option>
                </select>
              </div>
              <div class="form-group">
                <label for="">Description</label>
                <textarea class="form-control" name="description"></textarea>
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
import { fireDb } from '~/plugins/firebase.js'

export default {
  methods: {
    async submit(e) {
      let { title, type, description } = e.target
      let data = {
        title: title.value,
        type: type.value,
        description: description.value
      }
      const ref = fireDb.collection('blog')
      try {
        await ref.add(data)
        alert('submitted')
        this.$router.push('/crud')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style></style>
