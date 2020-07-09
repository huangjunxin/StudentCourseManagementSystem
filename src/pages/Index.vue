<template>
  <q-page class="">
    <div style="max-width: 900px; margin-left: auto; margin-right: auto">
      <div style="height: 20px">
      </div>

      <div class="q-ma-md">
        <div class="q-ma-md">
          <q-form
            @submit="onSubmit"
            class="q-gutter-md"
          >
            <q-input
              v-model="studentName"
              standard
              placeholder="Please enter the name of the student"
              @input="onChange"
            >
              <template v-slot:append v-if="studentName.length !== 0">
                <q-icon name="close" @click="studentName = ''" class="cursor-pointer" />
              </template>
            </q-input>
            <div>
              <q-radio v-model="studentGender" val="" label="Unknown" />
              <q-radio v-model="studentGender" val="男" label="Male" />
              <q-radio v-model="studentGender" val="女" label="Female" />
            </div>
          </q-form>
        </div>
      </div>

      <div class="q-pa-md" v-show="studentName.length !== 0">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Num</th>
              <th class="text-right">Name</th>
              <th class="text-right">Gender</th>
              <th class="text-right">Age</th>
              <th class="text-right">Dept</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left">95002</td>
              <td class="text-right">王敏</td>
              <td class="text-right">女</td>
              <td class="text-right">18</td>
              <td class="text-right">MA</td>
            </tr>
            <tr>
              <td class="text-left">95005</td>
              <td class="text-right">王强</td>
              <td class="text-right">男</td>
              <td class="text-right">17</td>
              <td class="text-right">IS</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { get } from '../utils/http'

export default {
  name: 'PageIndex',

  data () {
    return {
      studentName: '',
      studentGender: ''
    }
  },
  methods: {
    onSubmit () {
      get('student', {
        studentName: this.studentName,
        studentGender: this.studentGender
      })
    }
  }
}
</script>
