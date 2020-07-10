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

      <div class="q-pa-md">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Num</th>
              <th class="text-right">Name</th>
              <th class="text-right">Gender</th>
              <th class="text-right">Age</th>
              <th class="text-right">Dept</th>
              <th class="text-right">Course</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in studentInfo" :key="row.sno">
              <td class="text-left">{{ row.sno }}</td>
              <td class="text-right">{{ row.sname }}</td>
              <td class="text-right">{{ row.ssex }}</td>
              <td class="text-right">{{ row.sage }}</td>
              <td class="text-right">{{ row.sdept }}</td>
              <td class="text-right">{{ row.courses }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',

  data () {
    return {
      studentName: '',
      studentGender: '',
      studentInfo: [
        // {
        //   sno: 95002,
        //   sname: '王敏',
        //   ssex: '女',
        //   sage: '18',
        //   sdept: 'MA',
        //   courses: [
        //     '软件工程',
        //     '计算机网络'
        //   ]
        // },
        // {
        //   sno: 95005,
        //   sname: '王强',
        //   ssex: '男',
        //   sage: '17',
        //   sdept: 'IS',
        //   courses: [
        //     '高等数学',
        //     '网页设计基础'
        //   ]
        // }
      ]
    }
  },
  methods: {
    onSubmit () {
      console.info(`[methods][onSubmit][studentName]${this.studentName}[studentGender]${this.studentGender}`)
      this.$http.get('/student/getStudentInfo', {
        params: {
          studentName: this.studentName,
          studentGender: this.studentGender
        }
      })
        .then(res => {
          if (res.data.code === -1) {
            console.error(res.data.data.msg)
          } else {
            this.studentInfo = res.data.data
          }
        })
    }
  }
}
</script>
