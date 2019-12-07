<template>
  <div>
    <el-input placeholder="filter all the data in the table" prefix-icon="el-icon-search" v-model="search"></el-input>
    <i style="float:left;">hour filter</i>
    <el-slider v-model="value1" range show-stops :max="23" @change="carouselChange"></el-slider>
    <el-input placeholder="filter street name" prefix-icon="el-icon-search" v-model="search1"></el-input>
      <el-table :data = "crimes"
                stripe
                :default-sort = "{prop: 'dayofweek', order: 'descending'}"
                style="width: 100%">
         <el-table-column
          prop="year"
          label="YEAR"
          width="180">
        </el-table-column>
        <el-table-column
          prop="dayofweek"
          label="DAY_OF_WEEK"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="district"
          label="DISTRICT"
          width="180">
        </el-table-column>
        <el-table-column
          prop="hour"
          label="HOUR"
          sortable
          :sort-method = "sortByHour"
          width="180">
        </el-table-column>
        <el-table-column
          prop="lat"
          label="Lat"
          width="180">
        </el-table-column>
        <el-table-column
          prop="location"
          label="Location"
          width="180">
        </el-table-column>
        <el-table-column
          prop="long"
          label="Long"
          width="180">
        </el-table-column>
        <el-table-column
          prop="month"
          label="MONTH"
          width="180">
        </el-table-column>
        <el-table-column
          prop="occurdate"
          label="OCCURED_ON_DATE"
          width="180">
        </el-table-column>
        <el-table-column
          prop="offcode"
          label="OFFENSE_CODE"
          width="180">
        </el-table-column>
        <el-table-column
          prop="offcodegroup"
          label="OFFENSE_CODE_GROUP"
          width="180">
        </el-table-column>
        <el-table-column
          prop="offdes"
          label="OFFENSE_DESCRIPTION"
          width="180">
        </el-table-column>
        <el-table-column
          prop="reportarea"
          label="REPORTING_AREA"
          width="180">
        </el-table-column>
        <el-table-column
          prop="shooting"
          label="SHOOTING"
          width="180">
        </el-table-column>
        <el-table-column
          prop="street"
          label="STREET"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ucrpart"
          label="UCR_PART"
          width="180">
        </el-table-column>

      </el-table>
  <div class="paginationClass">
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
    </el-pagination>
  </div>
 <button @click="emitEvent">data visualization</button>
  </div>
</template>

<script>
    import db from './firebaseInit'
    export default{
        name: "table",
        data() {
            return {
                total: 64000,
                currentPage:1,
                pageSize:10,
                crimerecords:[],
                temp: [],
                pageList:[],
                flag: 0,
                search: '',
                search1:'',
                value1: [0, 23],
                msg:[],
                data1:[],
                data2:[],
                data3 : [],
                data4 : [],
                data5 : [],
                data6 : [],
                data7 : [],
                data8 : [],
                data9 : [],
                data10 : [],
                data11 : [],
                data12 : [],
                data13 : [],
                data14 : [],
                data15 : [],
                data16 : [],
            }
        },
        methods: {
            handleSizeChange: function (pageSize) { // 每页条数切换
                this.pageSize = pageSize
                this.handleCurrentChange(this.currentPage);
            },
            handleCurrentChange: function (currentPage) {//页码切换
                this.currentPage = currentPage
                this.currentChangePage(this.crimerecords, currentPage)
            },
            //分页方法（重点）
            currentChangePage(list, currentPage) {
                console.log("currentPage",currentPage)
                let from = (currentPage - 1) * this.pageSize;
                let to = currentPage * this.pageSize;
                this.pageList = [];
                for (; from < to; from++) {
                    if (list[from]) {
                        this.pageList.push(list[from]);
                    }
                }
                this.flag = 0
            },
            carouselChange: function(key1) {
                console.log(key1);
                let crime
                crime = this.pageList.filter(data => {
                    let datareturn
                    if(data.hour >= key1[0] && data.hour <= key1[1])
                        return data
                })
                console.log("crime", crime)
                this.temp = []
                this.temp = crime
                this.flag = 1
                // this.$set(this.crimerecords,crime)
                console.log("this.temp", this.temp)
            },
            sortByHour(Obj1,Obj2){
                let val1 = Obj1.hour
                let val2 = Obj2.hour
                return val1 - val2
            },
            emitEvent(){
                this.$emit('my-event', this.msg)
      }
        },
        created() {
            db.collection('crimeRecord').limit(3000).get().then(querySnapshot => {
                querySnapshot.forEach(doc =>{
                    console.log(doc.data())
                    const data ={
                        'dayofweek':doc.data().DAY_OF_WEEK,
                        'district':doc.data().DISTRICT,
                        'hour':doc.data().HOUR,
                        'lat':doc.data().Lat,
                        'location':doc.data().Location,
                        'long':doc.data().Long,
                        'month':doc.data().MONTH,
                        'occurdate':doc.data().OCCURED_ON_DATE,
                        'offcode':doc.data().OFFENSE_CODE,
                        'offcodegroup':doc.data().OFFENSE_CODE_GROUP,
                        'offdes':doc.data().OFFENSE_DESCRIPTION,
                        'reportarea':doc.data().REPORTING_AREA,
                        'shooting':doc.data().SHOOTING,
                        'street':doc.data().STREET,
                        'ucrpart':doc.data().UCR_PART,
                        'year':doc.data().YEAR,
                    }
                    this.data1.push(data.dayofweek)
                    this.data2.push(data.district)
                    this.data3.push(data.hour)
                    this.data4.push(data.lat)
                    this.data5.push(data.location)
                    this.data6.push(data.long)
                    this.data7.push(data.month)
                    this.data8.push(data.occurdate)
                    this.data9.push(data.offcode)
                    this.data10.push(data.offcodegroup)
                    this.data11.push(data.offdes)
                    this.data12.push(data.reportarea)
                    this.data13.push(data.shooting)
                    this.data14.push(data.street)
                    this.data15.push(data.ucrpart)
                    this.data16.push(data.year)
                    this.crimerecords.push(data)
                })
                this.msg.push(this.data1)
                this.msg.push(this.data2)
                this.msg.push(this.data3)
                this.msg.push(this.data4)
                this.msg.push(this.data5)
                this.msg.push(this.data6)
                this.msg.push(this.data7)
                this.msg.push(this.data8)
                this.msg.push(this.data9)
                this.msg.push(this.data10)
                this.msg.push(this.data11)
                this.msg.push(this.data12)
                this.msg.push(this.data13)
                this.msg.push(this.data14)
                this.msg.push(this.data15)
                this.msg.push(this.data16)
                console.log("msg",this.msg)
                this.currentChangePage(this.crimerecords, 1);
            })
        },
        computed: {
            // 模糊搜索
            crimes () {
                const search = this.search
                if (search) {
                    // console.log('this.crimerecords', this.crimerecords)
                    return this.pageList.filter(data => {
                        return Object.keys(data).some(key => {
                      return String(data[key]).toLowerCase().indexOf(search) > -1
                  })
              })
          }
                const search1 = this.search1
                // console.log("search1",search1)
                if (search1) {
                    // console.log('this.crimerecords', this.crimerecords)
                    return this.pageList.filter(data => {
                        return Object.keys(data).some(key => {
                      return String(data[key]).toLowerCase().indexOf(search1) > -1
                  })
              })
          }
                if(this.flag == 1)
                    return this.temp
           // console.log('this.crimerecords', this.crimerecords)
           return this.pageList
      }
        }
    }
</script>

<style scoped>
  @import './css/style.css';
</style>
