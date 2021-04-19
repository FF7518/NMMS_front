<template>
  <div class="main">
    <div class="ppt">
      <!-- <a-carousel autoplay>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
      </a-carousel> -->
    </div>
    <p />
    <div class="goto">
      <a-row type="flex" justify="end" align="top">
        <a-col flex="auto">
          <!-- <a-divider dashed orientation="left">游泳馆会员卡管理系统</a-divider> -->
          <div class="welcome">
            <p class="wel-title">NMMS 游泳馆会员管理系统</p>
            <p class="wel-person">欢迎回来！管理员：{{ this.account }}</p>
            <!-- <p class="wel-txt">
              A natatorium (plural: natatoria) is a building containing a<br />
              swimming pool.[1] In Latin, a cella natatoria was a swimming pool<br />
              in its own building, although it is sometimes also used to refer<br />
              to any indoor pool even if not housed in a dedicated building<br />
              (e.g., a pool in a school or a fitness club).[2] It will usually<br />
              also house locker rooms, and perhaps allied activities, such as a<br />
              diving well or facilities for water polo. Many colleges,<br />
              universities and high schools have natatoria.<br />
            </p> -->
          </div>
        </a-col>
        <a-col v-if="auth_card" :span="3">
          <a-tooltip>
            <a-card hoverable style="width: 100%" @click="onCardmanageClick">
              <img slot="cover" alt="Card Manage" src="@/static/image/c1.png" />
              <a-card-meta title="会员卡管理">
                <template slot="description">
                  查询<br />
                  销售<br />
                  卡解禁/挂失/停用/退卡<br />
                  存款管理
                </template>
              </a-card-meta>
            </a-card>
            <template slot="title">
              <a> 查询 </a>
            </template>
          </a-tooltip>
        </a-col>
        <a-col v-if="isCMClick" :span="3">
          <a-row>
            <a-card title="查询" style="width: 100%">
              <template slot="extra">
                <router-link to="/dashboard/cardmanage">进入</router-link>
              </template>
            </a-card>
          </a-row>
          <a-row>
            <a-card title="售卡" style="width: 100%">
              <template slot="extra">
                <router-link to="/dashboard/cardsale">进入</router-link>
              </template>
            </a-card>
          </a-row>
          <a-row>
            <a-card title="挂失/停用/退卡……" style="width: 100%">
              <template slot="extra">
                <router-link to="/dashboard/cardban">进入</router-link>
              </template>
            </a-card>
          </a-row>
          <a-row>
            <a-card title="存款" style="width: 100%">
              <template slot="extra">
                <router-link to="/dashboard/cardsave">进入</router-link>
              </template>
            </a-card>
          </a-row>
        </a-col>
        <a-col v-if="auth_member" :span="3">
          <router-link to="/dashboard/membermanage">
            <a-card hoverable style="width: 100%">
              <img slot="cover" alt="Card Manage" src="@/static/image/m1.png" />
              <a-card-meta title="用户管理">
                <template slot="description">
                  查询<br />
                  销售<br />
                  卡解禁/挂失/停用/退卡<br />
                  存款管理
                </template>
              </a-card-meta>
            </a-card>
          </router-link>
        </a-col>
        <a-col v-if="auth_deposit" :span="3">
          <router-link to="/dashboard/financialmanage">
            <a-card hoverable style="width: 100%">
              <img slot="cover" alt="Card Manage" src="@/static/image/d1.png" />
              <a-card-meta title="消费管理">
                <template slot="description">
                  查询<br />
                  销售<br />
                  卡解禁/挂失/停用/退卡<br />
                  存款管理
                </template>
              </a-card-meta>
            </a-card>
          </router-link>
        </a-col>
        <a-col v-if="auth_sys" :span="3">
          <router-link to="/dashboard/admin">
            <a-card hoverable style="width: 100%">
              <img slot="cover" alt="Card Manage" src="@/static/image/s1.png" />
              <a-card-meta title="系统管理">
                <template slot="description">
                  查询<br />
                  销售<br />
                  卡解禁/挂失/停用/退卡<br />
                  存款管理
                </template>
              </a-card-meta>
            </a-card>
          </router-link>
        </a-col>
      </a-row>
    </div>
  </div>
</template>



<script src="@/script/main-page.js" />



<style scoped src='@/style/main-page.css' />
