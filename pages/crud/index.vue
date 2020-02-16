<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h4>List</h4>
              </div>
              <div class="col">
                <a href="crud/add">
                  <p class="text-right">Insert new Data</p>
                </a>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(blog, index) in blogs" :key="blog.id">
                  <td>{{ ++index }}</td>
                  <td>{{ blog.title }}</td>
                  <td>{{ blog.type }}</td>
                  <td>
                    <div class="row">
                      <nuxt-link :to="`/crud/${blog.id}`">
                        <button class="btn-sm btn btn-primary mr-2">
                          Show
                        </button>
                      </nuxt-link>
                      <nuxt-link :to="`/crud/edit/${blog.id}`">
                        <button class="btn-sm btn btn-warning mr-2">
                          Edit
                        </button>
                      </nuxt-link>
                      <button
                        class="btn-sm btn btn-danger"
                        @click="remove(blog.id)"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
      blogs: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async remove(id) {
      const ref = fireDb.collection('blog').doc(id)
      try {
        await ref.delete()
        alert('deleted')
        this.getData()
      } catch (error) {
        console.log(error)
      }
    },
    async getData() {
      const ref = fireDb.collection('blog')
      let data
      try {
        data = await ref.get()
      } catch (e) {
        console.log(e)
      }
      this.blogs = []
      data.docs.map(collection => {
        let data = collection.data()
        data.id = collection.id
        this.blogs.push(data)
      })
    }
  }
}
</script>

<style></style>
