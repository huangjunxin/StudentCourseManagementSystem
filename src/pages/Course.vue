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
              v-model="courseName"
              standard
              placeholder="Please enter the name of the course, or leave it blank to get all the courses"
            >
              <template v-slot:append v-if="courseName.length !== 0">
                <q-icon name="close" @click="courseName = ''" class="cursor-pointer" />
              </template>
            </q-input>
          </q-form>
        </div>
      </div>

      <div class="q-pa-md">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Num</th>
              <th class="text-right">Name</th>
              <th class="text-right">Pre-course Num</th>
              <th class="text-right">Credit</th>
              <th class="text-right">Grade Avg</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in courseInfo" :key="row.sno">
              <td class="text-left">{{ row.cno }}</td>
              <td class="text-right">{{ row.cname }}</td>
              <td class="text-right">{{ row.cpno }}</td>
              <td class="text-right">{{ row.ccredit }}</td>
              <td class="text-right">{{ row.gradeAvg }}</td>
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
      courseName: '',
      courseInfo: [
        // {
        //   cno: 1,
        //   cname: '数据库',
        //   cpno: 5,
        //   ccredit: 4,
        //   gradeAvg: 60.5
        // },
        // {
        //   cno: 2,
        //   cname: '数学',
        //   cpno: null,
        //   ccredit: 2,
        //   gradeAvg: 72.5
        // },
        // {
        //   cno: 3,
        //   cname: '信息系统',
        //   cpno: 1,
        //   ccredit: 4,
        //   gradeAvg: 62.12
        // }
      ]
    }
  },
  methods: {
    onSubmit () {
      console.info(`[methods][onSubmit][courseName]${this.courseName}`)
      this.$http.get('/course/getCourseInfo', {
        params: {
          courseName: this.courseName
        }
      })
        .then(res => {
          if (res.data.code === -1) {
            console.error(res.data.data.msg)
          } else {
            this.courseInfo = res.data.data
          }
        })
    }
  }
}
</script>
