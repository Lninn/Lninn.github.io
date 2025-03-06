import { supabase } from '#/supabaseClient'
import { handleApiError } from '#/utils/errorHandler'

export const errorLogsApi = {
  async fetchLogs({ environment, startDate, endDate, searchTerm, limit = 100 }) {
    try {
      let query = supabase
        .from('error_logs')
        .select('*')
        .order('timestamp', { ascending: false })

      if (environment) {
        query = query.eq('environment', environment)
      }

      if (startDate) {
        query = query.gte('timestamp', startDate)
      }

      if (endDate) {
        query = query.lte('timestamp', endDate)
      }

      if (searchTerm) {
        query = query.or(`error.ilike.%${searchTerm}%,component_info.ilike.%${searchTerm}%`)
      }

      const { data, error } = await query.limit(limit)
      if (error) throw error
      return data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  async deleteLogs(beforeDate) {
    try {
      const { error } = await supabase
        .from('error_logs')
        .delete()
        .lt('timestamp', beforeDate)

      if (error) throw error
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  async exportLogs(logs) {
    const csv = [
      ['时间', '环境', '组件', '错误信息', 'URL', '用户代理'].join(','),
      ...logs.map(log => [
        new Date(log.timestamp).toLocaleString(),
        log.environment,
        log.component_info,
        `"${log.error.replace(/"/g, '""')}"`,
        log.url,
        `"${log.user_agent.replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    return blob
  }
}