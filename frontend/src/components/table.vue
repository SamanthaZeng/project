<template>
  <div>
    <el-input placeholder="filter all the data in the table" prefix-icon="el-icon-search" v-model="search"></el-input>
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
  </div>
</template>

<script>
    import db from './firebaseInit'
    export default {
        name: "table",
        data() {
            return {
                total: 10,
                currentPage:1,
                pageSize:10,
                crimerecords:[],
                search: ''
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
                let from = (currentPage - 1) * this.pageSize;
                let to = currentPage * this.pageSize;
                this.tempList = [];
                for (; from < to; from++) {
                    if (list[from]) {
                        this.tempList.push(list[from]);
                    }
                }
            }
        },
        created() {
            db.collection('crimeRecord').limit(10).get().then(querySnapshot => {
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
                    this.crimerecords.push(data)
                })
            })
        },
        computed: {
            // 模糊搜索
            crimes () {
                const search = this.search
                if (search) {
                    console.log('this.crimerecords', this.crimerecords)
                    return this.crimerecords.filter(data => {
                        return Object.keys(data).some(key => {
                      return String(data[key]).toLowerCase().indexOf(search) > -1
                  })
              })
          }
           console.log('this.crimerecords', this.crimerecords)
          return this.crimerecords
      }
        }
    }
</script>

<style scoped>
  @import './css/style.css';
</style>
