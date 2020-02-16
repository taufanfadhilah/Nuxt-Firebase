<template>
  <div class="container text-center">
    <nuxt-link to="crud">
      <h4>Goto CRUD</h4>
    </nuxt-link>
    <div class="row mt-5">
      <div class="col-md-6 offset-md-3">
        <div>
          <h2>
            Write to Firestore.
          </h2>
          <div>
            <button
              @click="writeToFirestore"
              :disabled="writeSuccessful"
              class="btn btn-warning"
            >
              <span v-if="!writeSuccessful">Write now</span>
              <span v-else>Successful!</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-6 offset-md-3">
        <div>
          <h2>
            Read from Firestore.
          </h2>
          <div>
            <button
              @click="readFromFirestore"
              :disabled="readSuccessful"
              class="btn btn-primary"
            >
              <span v-if="!readSuccessful">Read now</span>
              <span v-else>Successful!</span>
            </button>
            <p>{{ text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'
export default {
  async asyncData({ app, params, error }) {
    const ref = fireDb.collection('test').doc('test')
    let snap
    try {
      snap = await ref.get()
    } catch (e) {
      // TODO: error handling
      console.error(e)
    }
    return {
      text: snap.data().text
    }
  },
  data() {
    return {
      writeSuccessful: false,
      readSuccessful: false,
      text: ''
    }
  },
  methods: {
    async writeToFirestore() {
      const ref = fireDb.collection('test').doc('test')
      const document = {
        text: 'This is a test message.'
      }
      try {
        await ref.set(document)
      } catch (e) {
        // TODO: error handling
        console.error(e)
      }
      this.writeSuccessful = true
    },
    async readFromFirestore() {
      const ref = fireDb.collection('test').doc('test')
      let snap
      try {
        snap = await ref.get()
      } catch (e) {
        // TODO: error handling
        console.error(e)
      }
      this.text = snap.data().text
      this.readSuccessful = true
    }
  }
}
</script>
